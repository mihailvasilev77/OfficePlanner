const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  roles: {
    User: { type: Number, default: 2001 },
    Editor: Number,
    Admin: Number,
  },
  password: { type: String, required: true },
  refreshToken: String,
  vacationLeaves: { type: Number, default: 20 },
});

module.exports = mongoose.model('User', userSchema);
