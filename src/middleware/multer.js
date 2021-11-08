const multer = require('multer');

const storage = multer.memoryStorage();

// Set fileSize limit - 10MB
const limits = {
  fileSize: 10000000,
};

/**
 * @name fileFilter
 * @param {object} req Express Request Object
 * @param {object} file Express Response Object
 * @param {object} cb Callback function
 * @return {Null/Object} return an error object or sets property in request object
 */
const filter = (req, file, cb) => {
  if (!file.mimetype.includes('csv')) {
    return cb(new Error('Only .csv files are allowed!'));
  }
  return cb(null, true);
};

// Init upload middleware
const csvUpload = multer({ storage, limits, fileFilter: filter });

exports.uploadCsv = csvUpload.single('file');
