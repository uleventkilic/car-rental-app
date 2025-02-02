const mongoose = require("mongoose");

const OfficeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    location: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true }
    }
});

// 📌 Konum için GeoJSON desteği ekleyelim
OfficeSchema.index({ location: "2dsphere" });

const Office = mongoose.model("Office", OfficeSchema);
module.exports = Office;
