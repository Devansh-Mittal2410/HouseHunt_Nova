const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGO_DB;

  if (!mongoUri) {
    throw new Error('MongoDB URI is missing. Set MONGO_URI in server/.env');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    throw new Error(`Could not connect to MongoDB: ${err.message}`);
  }
};

module.exports = connectDB;