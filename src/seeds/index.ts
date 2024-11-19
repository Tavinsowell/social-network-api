// Import the database connection
import db from "../config/connection.js";

// Import the User and Thought models
import { User, Thought } from "../models/index.js";

// Import the user and thought seed data
import { userSeeds, thoughtSeeds } from "./seed.js";

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Wait for the database connection to be established
    await db();

    // Delete all existing User and Thought documents to start fresh
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Existing Users and Thoughts deleted.");

    // Insert the array of user seed data into the User collection
    await User.insertMany(userSeeds);
    console.log("Seeded Users.");

    // For each thought in the thought seed data, create a new Thought document
    for (const thought of thoughtSeeds) {
      const newThought = await Thought.create({
        thoughtText: thought.thoughtText,
        username: thought.username,
      });

      // After creating a Thought, associate it with the corresponding User's `thoughts` array
      await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: newThought._id } }
      );
    }

    console.log("Thoughts created and associated with the appropriate users.");

    // Log a success message and close the database connection
    console.log("Seeding complete. Closing database connection...");
    process.exit(0);
  } catch (error) {
    // Log any errors that occur during the seeding process and exit with failure
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Call the seedDatabase function to execute the seeding process
seedDatabase();