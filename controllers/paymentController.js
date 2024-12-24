
// clase alan

// Importación del paquete MercadoPago y de la configuración del cliente
// CommonJS utiliza require en lugar de import
const { Preference } = require('mercadopago'); // Clase Preference para crear preferencias de pago
const client = require('../config/mercadopago'); // Configuración del cliente de MercadoPago

/**
 * Función controladora para crear una preferencia de pago en MercadoPago.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Middleware para manejar errores o pasar al siguiente middleware.
 */
const createPreference = async (req, res) => {
    try {
        // Desestructuramos el carrito enviado en el cuerpo de la solicitud
        const { cart } = req.body;


        // Estructuración de los datos de los productos del carrito
        // `cart` debe ser un arreglo que contenga productos con las propiedades `nombre`, `precio`, y `quantity` campos propuestos por mercadopago coincidor con frontend
        const items = cart.map((product) => ({
            title: product.name, // Nombre del producto
            unit_price: Number(product.price), // Precio unitario convertido a número
            quantity: Number(product.quantity), // Cantidad convertida a número
            currency_id: "CLP" // Identificador de moneda (peso chileno)
        }));

        // Cuerpo de configuración para las preferencias de pago
        const body = {
            items, // Lista de productos en el carrito
            back_urls: {
                success: 'http://localhost:5173/mercadopago/status?status=approved', // Redireccion en caso de éxito. misma direccion de un estado de promesa. debe estar vinculado a front
                failure: 'http://localhost:5173/mercadopago/status?status=failure', // URL de fallo. despues no debe estar en local
                pending: 'http://localhost:5173/mercadopago/status?status=pending' // URL de pendiente
            },
            auto_return: 'approved' // Configuración para redirigir automáticamente si es aprobado o tenemos exito en el pago
        };

        // Creamos una instancia de la clase Preference con el cliente configurado
        const preference = new Preference(client);  // crea comunicacion con la API, aca recibe el client desde mercadopago.js
        // Llamamos al método `create` de Preference para enviar la solicitud a MercadoPago. creamos la estructura de la preferencia
        const response = await preference.create({ body });   // metodo create que requiere un {objeto} que es el {body}

        // Respondemos con el ID de la preferencia creada
        res.status(200).json({ id: response.id }); //json:id unico de los pago para comunicarse con el FRONT.
    } 
    catch (error) {
        // En caso de error, lo registramos en consola y lo pasamos al siguiente middleware
        console.error(error);
        res.status(500).json({message: "no se hizo el pago"})
    }
};

// Exportamos la función como parte del módulo
module.exports = {
    createPreference,
};


