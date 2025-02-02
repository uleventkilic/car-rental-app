const Car = require("../models/Car");

// Yeni araç ekleme
exports.addCar = async (req, res) => {
    try {
        const newCar = new Car(req.body);
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası");
    }
};

// Tüm araçları listeleme
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası");
    }
};

// Filtrelenmiş araçları listeleme
exports.getFilteredCars = async (req, res) => {
    try {
        const { brand, transmission, minAge, maxPrice, location } = req.query;
        let filters = {};

        if (brand) filters.brand = brand;
        if (transmission) filters.transmission = transmission;
        if (minAge) filters.minAge = { $lte: minAge };
        if (maxPrice) filters.dailyPrice = { $lte: maxPrice };
        if (location) filters.location = location;

        const cars = await Car.find(filters);
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası");
    }
};
