const express = require('express');
const multer = require('../middleware/multer');
const resultsController = require('../controller/results');

const router = express.Router();

router.post('/csv', multer.uploadCsv, resultsController.uploadCSV);

module.exports = router;
