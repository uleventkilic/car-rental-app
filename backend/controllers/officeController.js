const Office = require("../models/Office");
const axios = require("axios");

// Yeni ofis ekleme ve Google Maps API ile koordinat alma
exports.addOffice = async (req, res) => {
    try {
        const { name, address, city, country } = req.body;

        // Google Maps API ile adresi koordinatlara çevir
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)},${city},${country}&key=${apiKey}`;
        
        const response = await axios.get(url);
        
        if (response.data.status !== "OK") {
            return res.status(400).json({ msg: "Adres koordinatları alınamadı!" });
        }

        const location = response.data.results[0].geometry.location;

        const newOffice = new Office({
            name,
            address,
            city,
            country,
            latitude: location.lat,
            longitude: location.lng
        });

        await newOffice.save();
        res.status(201).json(newOffice);
    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası");
    }
};

// Kullanıcının konumuna en yakın araç kiralama ofislerini listeleme
exports.getNearestOffices = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ msg: "Konum bilgileri eksik!" });
        }

        const offices = await Office.find();

        const filteredOffices = offices.map(office => {
            const distance = getDistance(latitude, longitude, office.latitude, office.longitude);
            return { ...office._doc, distance };
        }).filter(office => office.distance <= 30) // 30 km içinde olanları listele

        res.json(filteredOffices);
    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası");
    }
};

// İki nokta arasındaki mesafeyi hesaplayan fonksiyon (Haversine Formülü)
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Dünya'nın yarıçapı (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Mesafeyi km olarak döndür
};
