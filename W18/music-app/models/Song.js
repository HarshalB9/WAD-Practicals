const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: { type: String, default: "N/A" },
    Actress: { type: String, default: "N/A" }
});

module.exports = mongoose.model('songdetails', SongSchema);