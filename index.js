// Importa la biblioteca dotenv para manejar variables de entorno
const dotenv = require("dotenv");
// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

// Importa la función para conectar a la base de datos desde el archivo de configuración
const connectDB = require("./config/db");

// Importa la biblioteca Express para crear el servidor
const express = require("express");

// Importa la biblioteca CORS para permitir solicitudes entre dominios
const cors = require("cors");

// Importa bibliotecas para generar documentación de Swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Importa las rutas para manejar diferentes recursos de la API
const userRoutes = require("./routes/userRoutes"); // Rutas para usuarios
const productRoutes = require("./routes/productRoutes"); // Rutas para productos
const paymentRoutes = require("./routes/paymentRoutes"); // Rutas para pagos

// Crea una aplicación Express
const app = express();

// Llama a la función para conectar a la base de datos
connectDB();

// ** Middleware **
// Habilita CORS para permitir solicitudes desde otros orígenes
app.use(cors());

// Habilita el análisis de datos en formato JSON en las solicitudes entrantes
app.use(express.json());

// Habilita el análisis de datos codificados en URL en las solicitudes entrantes
app.use(express.urlencoded({ extended: true }));

// ** Configuración de Swagger **
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Versión de OpenAPI utilizada
    info: {
      title: "API Documentation", // Título de la documentación
      version: "1.0.0", // Versión de la API
      description: "Documentación para la API de Usuarios, Productos y Pagos", // Descripción de la API
    },
    servers: [
      {
        url: "http://localhost:5000/api", // URL base para la API
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http", // Tipo de esquema de seguridad (HTTP)
          scheme: "bearer", // Utiliza autenticación de tipo "Bearer"
          bearerFormat: "JWT", // Formato de token JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Requiere autenticación para acceder a las rutas protegidas
      },
    ],
  },
  apis: ["./routes/*.js"], // Define dónde están los archivos de rutas que contienen documentación Swagger
};

// Genera la documentación Swagger utilizando las opciones configuradas
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Configura una ruta para servir la interfaz de usuario de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ** Configuración de Rutas **
// Configura las rutas relacionadas con usuarios bajo el endpoint "/api/user"
app.use("/api/user", userRoutes);

// Configura las rutas relacionadas con productos bajo el endpoint "/api/product"
app.use("/api/product", productRoutes);

// Configura las rutas relacionadas con pagos bajo el endpoint "/api/payments"
app.use("/api/payments", paymentRoutes); 
// Ejemplo de uso en Postman: http://localhost:5000/api/payments/create_preference

// ** Configuración del Servidor **
// Obtiene el puerto desde las variables de entorno o usa el puerto 5000 como predeterminado
const PORT = process.env.PORT || 5000;

// Inicia el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); // Mensaje en la consola al iniciar el servidor
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`); // URL para acceder a Swagger
});
