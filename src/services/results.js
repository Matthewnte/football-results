const db = require('../config/knex');
const uploader = require('../utils/uploader');
const Exception = require('../utils/exception');
const { calculateQueryParams } = require('../utils');

const ResultsService = {
  getAllSeasonPairs: async (query) => {
    const { limit, offset } = calculateQueryParams(query);

    return db('results').limit(limit).offset(offset);
  },

  uploadResults: async (file) => {
    if (!file) throw new Exception('Please upload a CSV file!', 400);

    const results = await db('results').select('id');

    const resultId = results.map((data) => parseInt(data.id, 10));

    await uploader.csv({ file, resultId });
  },

  getSingleSeason: async (season, query) => {
    const { limit, offset } = calculateQueryParams(query);

    return db('results').where({ Season: season }).limit(limit).offset(offset);
  },
};

module.exports = ResultsService;
