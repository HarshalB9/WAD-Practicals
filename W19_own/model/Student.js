const mongoose = require('mongoose');

const Student = new mongoose.Schema({
    Name: String,
    Rollno: Number,
    WADmarks: Number,
    CCmarks: Number,
    DSBDAmarks: Number,
    CNSmarks: Number,
    AImarks: Number
});

module.exports = mongoose.model('studentmarks', Student);