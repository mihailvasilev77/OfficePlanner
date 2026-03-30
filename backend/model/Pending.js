const mongoose = require('mongoose');

const pendingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Pending', pendingSchema);
