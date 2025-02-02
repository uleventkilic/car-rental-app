const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    office: { type: mongoose.Schema.Types.ObjectId, ref: "Office", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Active", "Cancelled", "Completed"], default: "Active" }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", ReservationSchema);
