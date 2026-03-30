const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Removed deprecated useUnifiedTopology / useNewUrlParser options
    // (they are no-ops in Mongoose 7+ and removed in Mongoose 8)
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = connectDB;
