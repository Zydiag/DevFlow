import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);
  if (!process.env.MONGODB_URI) {
    return console.error('MISSING MONGODB_URL');
  }
  if (isConnected) {
    console.log('already connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'devflow' });
    isConnected = true;
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
  }
};
