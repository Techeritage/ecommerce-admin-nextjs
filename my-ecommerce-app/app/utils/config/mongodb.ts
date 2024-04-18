import mongoose from 'mongoose';

// MongoDB connection string
const mongoURI: string = process.env.MongoURL ?? '';

// Function to connect to MongoDB
export const connectToMongoDB = async (): Promise<void> => {
  try {
    // Connect to MongoDB without the deprecated options
    await mongoose.connect(mongoURI, {
      // Other connection options can be specified here
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
