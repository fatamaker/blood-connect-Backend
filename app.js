// Importing necessary modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const donorRoutes = require("./routes/donorRoutes");
const hopitalRoutes = require("./routes/hopitalRoutes");
const contactRoutes = require("./routes/contactRoutes");


// Initialize the app
const app = express();

dotenv.config();

// Middleware
app.use(bodyParser.json());

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"], // Allow these headers
  })
);

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/blood-connect1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/donors", donorRoutes);
app.use("/api/hopitals", hopitalRoutes);
app.use("/api/contacts", contactRoutes);
// Default route
app.get("/", (req, res) => {
  res.send("Blood Connect API is running");
});

module.exports = app;
