const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Imported path
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/sagaar-agri');

// Define a simple structure for your data
const DataSchema = new mongoose.Schema({ title: String, description: String, price: String });
const Project = mongoose.model('Project', DataSchema);

// API route to get data for your website
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// Serve your bb.html file at the home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bb.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
