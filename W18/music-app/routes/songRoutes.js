const express = require('express');
const router = express.Router();

const songController = require('../controllers/songController');

// get method only for init, all, search
// post method for add, delete, update
router.get('/init', songController.initDB);
router.get('/all', songController.listAll);
router.get('/search', songController.searchSongs);
router.post('/add', songController.addSong);
router.post('/delete', songController.deleteSong);
router.post('/update', songController.updateCast);

module.exports = router;