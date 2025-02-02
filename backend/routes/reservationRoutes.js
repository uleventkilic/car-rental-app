const express = require("express");
const { bookCar, getUserReservations, cancelReservation } = require("../controllers/reservationController");

const router = express.Router();

router.post("/book", bookCar);
router.get("/user/:userId", getUserReservations);
router.delete("/:id", cancelReservation);

module.exports = router;  // ✅ Yine `module.exports = router` olmalı
