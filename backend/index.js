// index.js
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const deckRoutes = require("./routes/deckRoutes");

const index = express();

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
index.use(express.json());

// Routes
index.use("/api", userRoutes);
index.use("/decks", deckRoutes);

// Start the server
index.listen(3000, () => {
  console.log("Server listening on port 3000");
});
