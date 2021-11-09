const catchAsyncError = require('../utils/catchAsync');
const ResultsService = require('../services/results');

const Results = {
  uploadCSV: catchAsyncError(async (request, response) => {
    await ResultsService.uploadResults(request.file);

    return response.status(201).json({
      status: 'Successful',
      message: 'Upload successful',
    });
  }),

  getAllSeasonPairs: catchAsyncError(async (request, response) => {
    const results = await ResultsService.getAllSeasonPairs(request.query);

    return response.json({
      status: 'Successful',
      results: results.length,
      data: results,
    });
  }),

  getSingleSeason: catchAsyncError(async (request, response) => {
    const { season } = request.params;

    const results = await ResultsService.getSingleSeason(season, request.query);

    return response.json({
      status: 'Successful',
      results: results.length,
      data: results,
    });
  }),
};

module.exports = Results;
