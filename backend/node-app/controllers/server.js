// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

// Define your mongoose models for users and products

// Define routes for fetching users and products from the database

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
