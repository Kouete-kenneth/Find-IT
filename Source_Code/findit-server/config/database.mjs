import mongoose from "mongoose";

const connectToDatabase = async () => {
  const connectionString = process.env.MONGODB_URL || "";
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(connectionString, {
      dbName: "AppleProduct-operationalDB",
      socketTimeoutMS: 30000
    });
    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to MongoDB');
  }
};

export default connectToDatabase;
