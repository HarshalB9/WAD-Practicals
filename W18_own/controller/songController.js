const Song = require('../model/Song');

const renderTable = async(res, songs, message = "") => {
    const tableRows = songs.map(s => `
        <tr>
            <td>${s.Name}</td>
            <td>${s.Film}</td>
            <td>${s.Director}</td>
            <td>${s.Singer}</td>
            <td>${s.Actor}</td>
            <td>${s.Actress}</td>
        </tr>
    `).join('');

    const html = `
        <h2>${message}</h2>
        <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Film</td>
                    <td>Director</td>
                    <td>Singer</td>
                    <td>Actor</td>
                    <td>Actress</td>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
        <br>
        <a href="/">Go to Dashboard</a>
    `;

    res.send(html);
};

exports.initDB = async(req, res) => {
    await Song.deleteMany({});
    const inital = [
        {"Name": 'song1', "Film": 'film1', "Director":'dir1', "Singer": 'singer1'},
        {"Name": 'song2', "Film": 'film2', "Director":'dir2', "Singer": 'singer2'},
        {"Name": 'song3', "Film": 'film3', "Director":'dir3', "Singer": 'singer3'},
        {"Name": 'song4', "Film": 'film4', "Director":'dir4', "Singer": 'singer4'}
    ];
    await Song.insertMany(inital);

    const songs = await Song.find();

    renderTable(res, songs, 'DB initialized with 5 songs.');
};

exports.listAll = async(req, res) => {
    const songs = await Song.find();
    renderTable(res, songs, `Total songs: ${songs.length}`);
};

exports.searchSong = async(req, res) => {
    const {film, director, singer} = req.query;
    let query = {};
    if(film) query.Film = film;
    if(director) query.Director = director;
    if(singer) query.Singer = singer;

    //hnh
    //find or findOne
    const result = await Song.find(query);

    renderTable(res, result, `Search results`);
};

exports.deleteSong = async(req, res) => {
    const result = await Song.deleteOne({Name: req.body.songname});
    const songs = await Song.find();

    if(result.deletedCount === 0){
        return renderTable(res, songs, `No song found with name: ${req.body.songname}`);
    }

    renderTable(res, songs, `Song deleted: ${req.body.songname}`);
};

exports.addSong = async (req, res) => {
    await Song.create(req.body);

    const songs = await Song.find();

    renderTable(res, songs, `Song added successfully!`);
};

exports.updateCast = async(req, res) => {
    const result = await Song.updateMany(
        {Name: req.body.songname},
        {$set: {Actor: req.body.actor, Actress: req.body.actress}}
    );

    const songs = await Song.find();

    if(result.matchedCount === 0){
        return renderTable(res, songs, `No song found with name: ${req.body.songname}`);
    }

    renderTable(res, songs, `Cast updated!`);
};


