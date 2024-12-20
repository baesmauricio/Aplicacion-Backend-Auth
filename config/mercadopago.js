
// clase alan

//Importamos la librería `mercadopago` para interactuar con la API de MercadoPago.
//Esto nos permite configurar y realizar operaciones como crear pagos y órdenes.
const MercadoPago = require("mercadopago");

// Importamos la librería `dotenv` para cargar variables de entorno desde un archivo `.env`.
// Esto es útil para mantener datos sensibles como claves API fuera del código fuente.
const dotenv = require("dotenv");

// Configuramos dotenv para que cargue las variables definidas en el archivo `.env`
// y las haga disponibles en `process.env`.
dotenv.config();

// Creamos una instancia de MercadoPago y configuramos el cliente.
// `access_token` es la clave privada que se utiliza para autenticar las solicitudes a la API de MercadoPago.
// `options` permite habilitar el modo sandbox (entorno de prueba) para evitar realizar transacciones reales.
const client = new MercadoPago.MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN, // Se obtiene el token desde las variables de entorno.
  options: { sandbox: true } // Modo de prueba activado.
});
// Exportamos el cliente configurado para que pueda ser utilizado en otras partes de la aplicación.
// Esto facilita mantener la configuración en un único lugar y reutilizarla en distintos controladores o servicios.
module.exports = client;





// import { MercadoPagoConfig } from 'mercadopago';
// import dotenv from 'dotenv';

// dotenv.config();

// const client = new MercadoPagoConfig({
//     accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
//     options: { sandbox: true }
// });

// export default client