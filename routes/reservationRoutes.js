const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// Rezervasyon oluşturma
router.post('/', async (req, res) => {
  const { userId, officeId, startDate, endDate } = req.body;

  try {
    const reservation = new Reservation({
      userId,
      officeId,
      startDate,
      endDate,
    });

    await reservation.save();
    res.status(201).json({
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Kullanıcının rezervasyonlarını al
router.get('/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId }).populate('officeId');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
