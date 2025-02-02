const Reservation = require("../models/Reservation");
const Car = require("../models/Car");

// Araç rezervasyonu yapma
exports.bookCar = async (req, res) => {
    try {
        const { user, car, office, startDate, endDate, totalPrice } = req.body;

        // Araç uygun mu kontrol et
        const carExists = await Car.findById(car);
        if (!carExists || !carExists.available) {
            return res.status(400).json({ msg: "Bu araç şu anda kiralanamaz!" });
        }

        // Rezervasyonu oluştur
        const reservation = new Reservation({
            user,
            car,
            office,
            startDate,
            endDate,
            totalPrice
        });

        await reservation.save();

        // Aracı kiralanamaz yap
        await Car.findByIdAndUpdate(car, { available: false });

        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası");
    }
};

// Kullanıcının rezervasyonlarını listeleme
exports.getUserReservations = async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await Reservation.find({ user: userId }).populate("car office");

        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası");
    }
};

// Rezervasyon iptal etme
exports.cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;

        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ msg: "Rezervasyon bulunamadı!" });
        }

        // Aracı tekrar müsait yap
        await Car.findByIdAndUpdate(reservation.car, { available: true });

        // Rezervasyonu iptal et
        reservation.status = "Cancelled";
        await reservation.save();

        res.json({ msg: "Rezervasyon iptal edildi." });
    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası");
    }
};
