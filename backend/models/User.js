const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },  // Google ID'sini burada saklıyoruz
    country: { type: String, required: true },
    city: { type: String, required: true },
    photo: { type: String },  // Google fotoğrafı URL'si
});

const User = mongoose.model("User", userSchema);

module.exports = User;
