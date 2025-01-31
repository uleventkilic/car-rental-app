const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  officeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Office', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
