// Import the Mongoose library to interact with the MongoDB database
import mongoose from "mongoose";

// Create an asynchronous function to establish a connection to the MongoDB database
const db = async (): Promise<typeof mongoose.connection> => {
  try {
    // Use the `mongoose.connect()` method to connect to the database
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB"
    );
    console.log("Database connected.");
    return mongoose.connection;
  } catch (error) {
    // If an error occurs while trying to connect to the database, log the error message
    console.error("Database connection error:", error);
    throw new Error("Database connection failed.");
  }
};

// Export the database connection function for use in the application
export default db;