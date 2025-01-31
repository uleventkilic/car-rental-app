const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [long, lat]
  }
});

officeSchema.index({ location: '2dsphere' }); // Konum aramaları için

const Office = mongoose.model('Office', officeSchema);

module.exports = Office;
