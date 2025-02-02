const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    transmission: { type: String, enum: ["Manual", "Automatic"], required: true },
    deposit: { type: Number, required: true },
    mileage: { type: Number, required: true },
    minAge: { type: Number, required: true, default: 18 },
    dailyPrice: { type: Number, required: true },
    location: { type: String, required: true },
    image: { 
        type: String, 
        required: true, 
        default: function () {
            return `/images/${this.brand.toLowerCase()}_${this.model.toLowerCase()}.png`;
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Car", CarSchema);
