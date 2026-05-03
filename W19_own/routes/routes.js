const express = require('express');
const router = express.Router();

const studentController = require('../controller/studentController');

router.get('/init', studentController.initDB);
router.get('/all', studentController.listAll);
router.get('/greater', studentController.marksGreaterThan);
router.get('/less', studentController.marksLessThan);
router.post('/add', studentController.addRecord);
router.post('/update', studentController.update);
router.post('/delete', studentController.delete);

module.exports = router;