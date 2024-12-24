## implementacion mercadopago:
   - npm i mercadopago
   - config/mercadopago.js
   - copio Access Token en archivo  .env 
 - crear controlador: 
    - estructura de cart debe ser igual a al carrito de front
    - estructura de url deben comunicarse con el front

- errores
- controlados por middlewares

- crear rutas para el controlador
- copio ruta en el index
-Para probar con postman
{
    "cart":[
        {
            "nombre": "producto1",
            "precio": 100,
            "quantity": 3
        }
    ]
}

name (tipo Text): bicicleta Trek Elite
description (tipo Text): Bicicleta Cross Country elite
price (tipo Text): 1800000
photos (tipo File): adjunta la imagen.

minuto 35. ahora en el front 
- npm i @mercadopago/sdk-react

- en config creo archivo mercadopago..js
- variables de entorno VITE_MP_PUBLIC_KEY= public key