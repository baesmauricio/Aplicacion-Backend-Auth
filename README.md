# PROYECTO 6: Aplicación Backend con Autenticación

Este proyecto es una API REST para manejar usuarios y productos. Incluye autenticación con JWT, documentación con Swagger y conexión a MongoDB para el almacenamiento de datos.

---

## Descripcion del Proyecto
El objetivo del proyecto fue construir una aplicación backend que administre la autenticación y autorización de los usuarios utilizando tecnologías como JWT (JSON Web Tokens) en un servidor Node.js.
La aplicación esta estructurada de tal manera que incluyo dos modelos principales, uno para el Usuario y otro para el Producto o elemento que se quiera enlazar a ese usuario.
Los Usuarios se pueden registrar, iniciar sesion, verificar y actualizar datos. Para el modelo del producto, se implemento el proceso de CRUD (Crear, Leer, Actualizar, Borrar). Se utilizo MongoDB y Mongoose para la persistencia de datos.
Se utilizo Swagger para la documentacion de la API.

---

## Estructura del Proyecto

```bash
Proyecto/
├── .gitignore              # Archivo para ignorar archivos/carpetas en el control de versiones.
├── node_modules/           # Carpeta generada al instalar dependencias de npm.
├── package.json            # Archivo que contiene las dependencias y metadatos del proyecto.
├── package-lock.json       # Archivo que asegura la consistencia de las dependencias instaladas.
├── index.js                # Archivo principal del servidor.
├── .env                    # Variables de entorno (PORT, MONGO_URI, JWT_SECRET).
├── config/
│   └── db.js               # Configuración para la conexión a MongoDB.
├── controllers/
│   ├── userController.js   # Controlador para manejar la lógica de usuarios.
│   └── productController.js # Controlador para manejar la lógica de productos.
├── middleware/
│   └── authMiddleware.js   # Middleware para la autenticación de usuarios.
├── models/
│   ├── userModel.js        # Modelo para los usuarios.
│   └── productModel.js     # Modelo para los productos.
├── routes/
    ├── userRoutes.js       # Rutas relacionadas con los usuarios.
    └── productRoutes.js    # Rutas relacionadas con los productos.
```
---

## Requisitos
Para ejecutar este proyecto, requieres:

- Node.js (v14 o superior)
- NPM (gestor de paquetes de Node.js)
- MongoDB Atlas (base de datos en la nube de MongoDB) 
- Un editor de texto como Visual Studio Code (VSC)

---

## Configuracion de MongoDB Atlas
1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Crea un nuevo clúster y una base de datos.
3. Crea una colección llamada `Users`.
4. Añade un usuario con permisos de lectura y escritura para la base de datos.
5. Copia la URL de conexión y configúrala en el archivo `.env` 

---

## Instalacion del Proyecto

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Aplicacion-Backend-Auth
   ```

2. Instala las dependencias:

a.	Npm: npm install
b.	Express : npm i express
c.	Dotenv:  npm i dotenv
d.	Cors: npm i cors
e.	Jsonwbtoken:  npm i jsonwebtoken
f.	Bcript: npm i bcryptjs
g.	Mongoose: npm i mongoose
h.	Swagger: npm i swagger-jsdoc swagger-ui-express


3. Configura las variables de entorno creando un archivo `.env`
```
PORT=5000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta
```
- Asegúrate de proporcionar un URI válido para MONGO_URI y una clave segura para JWT_SECRET 
- Reemplaza `<username>` y `<password>` con tus credenciales de MongoDB Atlas.

---

## Instrucciones para Ejecutar el Proyecto

1. Inicia el servidor:

```bash
node index.js
```
- El servidor esta corriendo
- Documentación disponible en http://localhost:5000/api-docs    
- Conectado a la base de datos: autenticacion_db

## Documentacion de la API
La API utiliza Swagger para su documentación

## Rutas principales

### Usuarios
- **Descripcion**: Registrar un usuario. 
- **Ruta**: /api/user/register   
- **Método**: POST
- **Body** (JSON):
```bash
{
  "nombre": "Mauricio Baes",
  "email": "baesmauricio@example.com",
  "password": "password123"
}
```

- **Descripcion**: inicio de sesion. 
- **Ruta**: /api/user/login   
- **Método**: POST
- **Body** (JSON):
```bash
{
  "email": "baesmauricio@example.com",
  "password": "password123"
}
```
Respuesta esperada: "inicio de sesion exitoso"
"Token": Tu Token copiado del inicio de sesion
Copio el token para usarlo en las siguientes solicitudes

- **Descripcion**: Verificar token. 
- **Ruta**: /api/user/verify   
- **Método**: GET
- **Header**:
    - Key: x-auth-token
    - Value: insertar token copiado previamente

- **Descripcion**: Actualizar un usuario. 
- **Ruta**: /api/user/update  
- **Método**: PUT
- **Headers**:
    - Key: x-auth-token
    - Value: insertar token copiado previamente
- **Body** (JSON):
```bash
{
  "nombre": "Mauricio Baes",
  "email": "bootcamp@example.com",
  "password": "newpassword123"
}
```

### Productos
**Descripcion**: Crear un nuevo producto. 
- **Ruta**: /api/product/   
- **Método**: POST
- **Headers**:
    - Key: x-auth-token
    - Value: insertar token copiado previamente
- **Body** (JSON):
```bash
{
  "name": "bicicleta mtb",
  "description": "Bicicleta Cross Country elite",
  "price": 1.800.000
}
```

- **Descripcion**: Obtener todos los productos
- **Ruta**: /api/product/   
- **Método**: GET


- **Descripcion**: Obtener un producto por ID
- **Ruta**: /api/product/:id  (pegar el id del producto copiado previamente) 
- **Método**: GET


- **Descripcion**: Actualizar un producto 
- **Ruta**: /api/product/:id (pegar el id del producto copiado previamente)   
- **Método**: PUT
- **Headers**:
    - Key: x-auth-token
    - Value: insertar token copiado previamente cuando inicie la sesion
- **Body** (JSON):
```bash
{
  "name": "Producto A actualizado",
  "description": "Descripción actualizada",
  "price": 150.75
}
```

- **Descripcion**: Eliminar un producto 
- **Ruta**: /api/product/:id (pegar el id del producto copiado previamente)   
- **Método**: DELETE
- **Headers**:
    - Key: x-auth-token
    - Value: insertar token copiado previamente cuando inicie la sesion



## Autor

Proyecto desarrollado por [Mauricio Baes](https://github.com/baesmauricio)

## Licencia

Este proyecto está bajo la Licencia MIT.