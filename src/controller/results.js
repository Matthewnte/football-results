const db = require('../config/knex');
const Exception = require('../utils/exception');
const catchAsyncError = require('../utils/catchAsync');
const uploader = require('../utils/uploader');

const Results = {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Results:
   *       type: object
   *     properties:
   *        id:
   *          type: Number
   *          description: The Id of result gotten from csv file upload
   *        div:
   *          type: string
   *          description: The team devision
   *        season:
   *          type: strings
   *          description: The football Season
   */
  uploadCSV: catchAsyncError(async (request, response) => {
    if (!request.file) throw new Exception('Please upload a CSV file!', 400);

    const results = await db('results').select('id');

    const resultId = results.map((data) => parseInt(data.id, 10));

    await uploader.csv({ file: request.file, resultId });

    response.status(201).json({
      status: 'Successful',
      message: 'Upload successful',
    });
  }),
};

module.exports = Results;
