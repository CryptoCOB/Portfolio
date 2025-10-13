const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  const dbName = process.env.MONGODB_DB || 'portfolio';
  await mongoose.connect(uri, { dbName });
  console.log('MongoDB connected:', dbName);
}

module.exports = { connectDB };
