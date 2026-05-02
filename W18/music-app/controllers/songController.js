const Song = require('../models/Song');

// Display All Table Helper
const renderTable = async (res, songs, message = "") => {
    let html = `<h3>${message}</h3><table border="1" style="width:100%; border-collapse: collapse;">
        <tr style="background-color: #eee;">
            <th>Song</th><th>Film</th><th>Director</th><th>Singer</th><th>Actor</th><th>Actress</th>
        </tr>
        ${songs.map(s => `<tr><td>${s.Songname}</td><td>${s.Film}</td><td>${s.Music_director}</td><td>${s.Singer}</td><td>${s.Actor}</td><td>${s.Actress}</td></tr>`).join('')}
    </table><br><a href="/">Back to Dashboard</a>`;
    res.send(html);
};

// a, b, c) Initialize with dummy data
exports.initDB = async (req, res) => {
    await Song.deleteMany({});
    const initial = [
        { Songname: 'Song1', Film: 'Film1', Music_director: 'Dir1', Singer: 'Singer1' },
        { Songname: 'Song2', Film: 'Film1', Music_director: 'Dir1', Singer: 'Singer2' },
        { Songname: 'Song3', Film: 'Film2', Music_director: 'Dir2', Singer: 'Singer1' },
        { Songname: 'Song4', Film: 'Film3', Music_director: 'Dir3', Singer: 'Singer3' },
        { Songname: 'Song5', Film: 'Film4', Music_director: 'Dir4', Singer: 'Singer4' }
    ];
    await Song.insertMany(initial);
    res.send("Database Initialized with 5 songs! <a href='/'>Go to Dashboard</a>");
};

// d) List all
exports.listAll = async (req, res) => {
    const songs = await Song.find();
    renderTable(res, songs, `Total Songs: ${songs.length}`);
};

// e, f, i) Search/Filter
exports.searchSongs = async (req, res) => {
    const { director, singer, film } = req.query;
    let query = {};
    if (director) query.Music_director = director;
    if (singer) query.Singer = singer;
    if (film) query.Film = film;

    const results = await Song.find(query);
    renderTable(res, results, "Search Results");
};

// g) Delete
exports.deleteSong = async (req, res) => {
    const result = await Song.deleteOne({ Songname: req.body.songName });
    const songs = await Song.find();
    if (result.deletedCount === 0) {
        return renderTable(res, songs, `Song not present: ${req.body.songName}`);
    }
    renderTable(res, songs, `Deleted: ${req.body.songName}`);
};

// h) Add New
exports.addSong = async (req, res) => {
    await Song.create(req.body);
    const songs = await Song.find();
    renderTable(res, songs, "Song Added Successfully!");
};

// j) Update Actor/Actress
exports.updateCast = async (req, res) => {
    const result = await Song.updateOne(
        { Songname: req.body.songName },
        { $set: { Actor: req.body.actor, Actress: req.body.actress } }
    );
    const songs = await Song.find();
    if (result.matchedCount === 0) {
        return renderTable(res, songs, `Song not present: ${req.body.songName}`);
    }
    renderTable(res, songs, "Cast Updated!");
};