const mongoose = require('mongoose');

const vacationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Vacation', vacationSchema);
