const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //learn this url properly
        await mongoose.connect('mongodb://127.0.0.1:27017/music');
        console.log("MongoDB Connected to 'music' database...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;