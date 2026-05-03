const mongoose = require('mongoose');

const Song = new mongoose.Schema({
    Name: String,
    Film: String,
    Director: String,
    Singer: String,
    Actor: {type: String, default: "NA"},
    Actress: {type: String, default: "NA"}
});

module.exports = mongoose.model('songdetails', Song);