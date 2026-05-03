const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: { type: String, default: "N/A" },
    Actress: { type: String, default: "N/A" }
});
//SongSchema - This is just a standard JavaScript variable name.

//songdetails - 
//Collection Creation: Mongoose uses this name to decide the name of the collection in MongoDB. By default, it will pluralize it. So, 'songdetails' will look for (or create) a collection named songdetails in your database.

//Internal Registry: Mongoose keeps a list of all models you’ve defined. If you ever need to reference this model from another model (like for a "Join" or "Population"), you use this string name.

//Compulsion: You don't use this name for importing/exporting, but it must match if you are trying to link different models together.
module.exports = mongoose.model('songdetails', SongSchema);

