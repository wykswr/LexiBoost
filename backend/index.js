// llm.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const deckRoutes = require('./routes/deckRoutes');
const verifyToken = require('./middleware/auth');

const cors = require('cors');


const index = express();

// CORS
index.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    },
));

// Connect to MongoDB
mongoose
    .connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
index.use(express.json());

// Routes
index.use('/users', userRoutes);
index.use('/decks', verifyToken, deckRoutes);

// Start the server
const port = process.env.PORT || 8000;
index.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening on port ${port}`);
});
