
// Importación del paquete `express`
const express = require("express"); // Paquete para crear rutas y manejar solicitudes
const { createPreference } = require("../controllers/paymentController"); // Controlador de MercadoPago

// Creamos una instancia del enrutador de Express
const router = express.Router();

/**
 * Ruta para crear una preferencia de pago en MercadoPago.
 * - Método: POST
 * - Ruta: `/create_preference`
 * - Controlador: `createPreference`
 */
router.post('/create_preference', createPreference);

// Exportamos el enrutador como parte del módulo
module.exports = router;
