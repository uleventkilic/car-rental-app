const express = require("express");
const { addCar, getAllCars, getFilteredCars } = require("../controllers/carController");

const router = express.Router();

router.post("/add", addCar);
router.get("/", getAllCars);
router.get("/search", getFilteredCars);

module.exports = router;  