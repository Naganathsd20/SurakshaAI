const mongoose = require('mongoose');

/**
 * Connects to MongoDB database using MONGODB_URI environment variable.
 * Handles missing URI or connection failures safely without crashing server startup.
 */
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.trim() === '' || mongoURI.includes('your_mongodb_atlas_connection_string_here')) {
    console.warn('⚠️ [MongoDB Warning]: MONGODB_URI is not configured in .env file.');
    console.warn('ℹ️ [MongoDB Info]: Backend server will run without database persistence.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ [MongoDB Connected]: Host -> ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ [MongoDB Error]: Connection failed -> ${error.message}`);
    console.warn('ℹ️ [MongoDB Info]: Server continuing without active database connection.');
    return false;
  }
};

module.exports = connectDB;
