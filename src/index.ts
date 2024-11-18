
// Import the express library to create an Express application
import express from "express";
// Import the Database connection from the config folder
import db from "./config/connection";
// Import the routes from the routes folder
import routes from "./routes/api/index";


await db();


// Define the port on which the server will listen. Use the environment variable if provided, otherwise default to 3001.
const PORT = 3001;
// Initialize the Express application
const app = express();

// Middleware to parse incoming URL-encoded data (from HTML forms)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse incoming JSON data
app.use(express.json());

// Use the imported routes from the base `/api` route
app.use(routes);

app.listen(PORT, () => {
  // Log a message in the console indicating the server is running with a copy/paste or clickable URL
  console.log(`Social Network API server running on http://localhost:${PORT}`);
});