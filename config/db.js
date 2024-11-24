// Importación del módulo mongoose
const mongoose = require("mongoose");

// Conexión a la base de datos
const connectDB = async () => {
  try {
    // Conectar a MongoDB utilizando la URI de conexión almacenada en las variables de entorno
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`\nConectado a la base de datos: ${mongoose.connection.name}`);
  } catch (error) {
    // Manejo de errores en la conexión
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1); // Salir del proceso con error
  }
};


module.exports = connectDB;


