const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  make: { type: String, required: true },
  transmission: { type: String, required: true },
  deposit: { type: Number, required: true },
  mileage: { type: Number, required: true },
  age: { type: Number, required: true },
  cost: { type: Number, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [long, lat]
  },
  image: { type: String }, // Resim URL
}, { timestamps: true });

carSchema.index({ location: "2dsphere" }); // Geospatial index

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
