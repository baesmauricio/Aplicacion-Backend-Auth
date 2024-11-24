const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true, min: 3, max: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", userSchema);
