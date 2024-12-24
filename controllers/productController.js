const Product = require("../models/productModel");

// Crear un nuevo producto
const createProduct = async (req, res) => {
  console.log(req.file.path)
  const imgUrl = req.file.path;
  const { name, description, price } = req.body;

  try {
    const newProduct = new Product({ name, description, price, photos:imgUrl });
    await newProduct.save();
    res.status(201).json({ message: "Producto creado con éxito", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

// Leer todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Leer un producto específico
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};


// Agregar fotos a un producto
const addProductPhotos = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Agregar las URLs de las fotos subidas a Cloudinary
    const photoUrls = req.files.map((file) => file.path);
    product.photos.push(...photoUrls);
    await product.save();

    res.status(200).json({ message: "Fotos agregadas con éxito", product });
  } catch (error) {
    res.status(500).json({ message: "Error al subir las fotos", error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductPhotos,
};
