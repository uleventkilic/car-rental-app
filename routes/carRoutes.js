const express = require('express');
const Car = require('../models/Car'); // Araba modeli
const router = express.Router();

// Tüm araçları getir
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();  // MongoDB'den tüm araçları al
    res.json(cars);  // JSON formatında geri gönder
  } catch (error) {
    res.status(500).json({ message: "Veri alırken hata oluştu" });
  }
});

// Belirli bir şehirdeki araçları al (örneğin, ofis için filtreleme)
router.get('/nearby', async (req, res) => {
  const { city, radius } = req.query;
  try {
    const cars = await Car.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [city.lng, city.lat] },
          $maxDistance: radius * 1000, // 30km'yi metrekare olarak çeviriyoruz
        }
      }
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Araçlar alınamadı." });
  }
});

module.exports = router;
