const express = require('express');
const router = express.Router();

const studentController = require('../controller/studentController');

router.get('/init', studentController.initDB);
router.get('/all', studentController.listAll);
router.get('/greater', studentController.moreThanMarks);
router.get('/less', studentController.lessThanMarks);
router.post('/add', studentController.addStudent);
router.post('/update', studentController.updateMarks);
router.post('/delete', studentController.deleteStudent);

module.exports = router;
