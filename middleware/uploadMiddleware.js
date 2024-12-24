const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "productos", // Carpeta en Cloudinary donde se guardarán las imágenes
    allowed_formats: ["jpg", "jpeg", "png"], // Formatos permitidos
  },
});

const upload = multer({ storage });

module.exports = upload;
