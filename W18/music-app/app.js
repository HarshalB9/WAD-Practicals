const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const songRoutes = require('./routes/songRoutes');

const app = express();
connectDB();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/music', songRoutes);

app.listen(3000, () => console.log("Server: http://localhost:3000"));