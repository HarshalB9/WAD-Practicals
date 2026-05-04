const Song = require('../models/Song');

// Display All Table Helper
// const renderTable = async (res, songs, message = "") => {
//     let html = `<h3>${message}</h3><table border="1" style="width:100%; border-collapse: collapse;">
//         <tr style="background-color: #eee;">
//             <th>Song</th><th>Film</th><th>Director</th><th>Singer</th><th>Actor</th><th>Actress</th>
//         </tr>
//         ${songs.map(s => `<tr><td>${s.Songname}</td><td>${s.Film}</td><td>${s.Music_director}</td><td>${s.Singer}</td><td>${s.Actor}</td><td>${s.Actress}</td></tr>`).join('')}
//     </table><br><a href="/">Back to Dashboard</a>`;
//     res.send(html);
// };

const renderTable = async (res, songs, message = "") => {
    // Generate the table rows by mapping through the songs array
    // const dateText = s.joiningDate ? new Date(s.joiningDate).toISOString().slice(0, 10) : 'N/A';
    const tableRows = songs.map(s => `
        <tr>
            <td>${s.Songname}</td>
            <td>${s.Film}</td>
            <td>${s.Music_director}</td>
            <td>${s.Singer}</td>
            <td>${s.Actor}</td>
            <td>${s.Actress}</td>
        </tr>
    `).join(''); // Join the array of rows into a single string

    // Combine everything into the final HTML structure
    const html = `
        <h3>${message}</h3>
        <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: #eee;">
                    <th>Song</th>
                    <th>Film</th>
                    <th>Director</th>
                    <th>Singer</th>
                    <th>Actor</th>
                    <th>Actress</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
        <br>
        <a href="/">Back to Dashboard</a>
    `;

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
//GET METHOD ASEL TAR req.query (mhanje, init, viewAll, search, yachya sathi get method, mhanje req.query)
//POST METHOD ASEL TAR req.body (mhanje update, add, delete, yachya sathi post method, mhanje req.body)
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