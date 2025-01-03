const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  //user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fechaCreacion: { type: Date, default: Date.now },
  photos: [{ type: String }], //URLs de fotos
});

module.exports = mongoose.model("Product", productSchema);
