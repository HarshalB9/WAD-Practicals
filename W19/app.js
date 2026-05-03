const express = require('express');
const path = require('path');

const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/marks', studentRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
