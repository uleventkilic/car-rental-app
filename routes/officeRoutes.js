const express = require('express');
const Office = require('../models/Office'); // Ofis modeli
const router = express.Router();

// Tüm ofisleri getir
router.get('/', async (req, res) => {
  try {
    const offices = await Office.find();  // MongoDB'den tüm ofisleri al
    res.json(offices);  // JSON formatında geri gönder
  } catch (error) {
    res.status(500).json({ message: "Ofisler alınırken hata oluştu" });
  }
});

// Belirli bir şehirdeki ofisleri al (örneğin, kullanıcı şehri)
router.get('/nearby', async (req, res) => {
  const { city, radius } = req.query;
  try {
    const offices = await Office.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [city.lng, city.lat] },
          $maxDistance: radius * 1000, // 30km'yi metrekare olarak çeviriyoruz
        }
      }
    });
    res.json(offices);
  } catch (error) {
    res.status(500).json({ message: "Ofisler alınamadı." });
  }
});

module.exports = router;
