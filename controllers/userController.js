const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Usuario ya existe" });

    // Crear un nuevo usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ nombre, email, password: hashedPassword });

    // Guardar el usuario en la base de datos
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Iniciar sesión del usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log(req.body)
  try {
    // Buscar el usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    // Generar un JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); //pasar a variable de entorno .env
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Verificar el token
const verifyToken = async (req, res) => {
  try {
    res.status(200).json({ message: "Token válido" });
  } catch (error) {
    res.status(500).json({ message: "Error al verificar el token", error });
  }
};

// Actualizar la información del usuario
const updateUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Buscar y actualizar el usuario
    const updatedUser = await User.findByIdAndUpdate(
      req.userId, 
      { nombre, email, password },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

module.exports = { registerUser, loginUser, verifyToken, updateUser };
