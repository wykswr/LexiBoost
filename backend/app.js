// app.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
    console.log(process.env.ATLAS_URI);
});

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

