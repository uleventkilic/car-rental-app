const express = require("express");
const router = express.Router();
const Office = require("../models/Office");


// 📌 Yeni ofis ekleme (POST /api/offices)
router.post("/", async (req, res) => {
    try {
        const { name, city, location } = req.body;

        if (!name || !city || !location) {
            return res.status(400).json({ error: "Tüm alanlar gereklidir." });
        }

        const newOffice = new Office({
            name,
            city,
            location
        });

        await newOffice.save();
        res.status(201).json(newOffice);
    } catch (error) {
        console.error("Ofis ekleme hatası:", error);
        res.status(500).json({ error: "Ofis eklenirken hata oluştu." });
    }
});

// 📌 Tüm ofisleri veya belirli bir şehre göre ofisleri getir
router.get("/", async (req, res) => {
    try {
        const { city } = req.query;
        let query = {};
        if (city) {
            query.city = city;
        }

        const offices = await Office.find(query);
        res.json(offices);
    } catch (error) {
        console.error("Ofisleri alma hatası:", error);
        res.status(500).json({ error: "Ofisler alınırken hata oluştu." });
    }
});

// 📌 Kullanıcının konumuna göre en yakın ofisleri getir (30 km içinde)
router.get("/nearby", async (req, res) => {
    try {
        const { lat, lng } = req.query;
        if (!lat || !lng) {
            return res.status(400).json({ error: "Latitude ve Longitude gereklidir." });
        }

        const offices = await Office.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: 30000 // 30 km içinde
                }
            }
        });

        res.json(offices);
    } catch (error) {
        console.error("Yakın ofisleri alma hatası:", error);
        res.status(500).json({ error: "Yakın ofisler alınırken hata oluştu." });
    }
});

module.exports = router;
