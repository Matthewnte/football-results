const fastcsv = require('fast-csv');
const { bufferToStream, formatDate } = require('.');
const db = require('../config/knex');
const Exception = require('./exception');

const uploader = {
  csv: ({ file, resultId }) => {
    const stream = bufferToStream(file.buffer);

    const csvData = [];

    const csvStream = fastcsv
      .parse({ headers: true })
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (data) => csvData.push(data))
      .on('end', async () => {
        const resultData = csvData.map((data) => {
          const match = resultId.indexOf(parseInt(data[''], 10));
          data = { ...data, id: data[''], Date: formatDate(data.Date, '/') };
          delete data[''];
          if (match === -1) return data;
        });

        if (!resultData.length) {
          return {
            status: 'Successful',
            message: 'All users already exist',
          };
        }

        await db('results')
          .insert(resultData)
          .catch((error) => {
            throw new Exception(`Fail to import data into database!: ${error.message}`, 500);
          });

        return {
          status: 'Successful',
          message: 'Upload successful',
        };
      });

    stream.pipe(csvStream);
  },
};

module.exports = uploader;
