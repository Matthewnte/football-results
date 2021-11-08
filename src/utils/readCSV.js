const fastcsv = require('fast-csv');
const { Duplex } = require('stream');
const db = require('../config/knex');

const bufferToStream = (myBuuffer) => {
  const tmp = new Duplex();
  tmp.push(myBuuffer);
  tmp.push(null);
  return tmp;
};

const importCSV = async (file) => {
  try {
    const stream = bufferToStream(file.buffer);

    const csvData = [];

    const results = await db('results').where({});

    const resultId = results.map((result) => result.id);

    const csvStream = fastcsv
      .parse({ headers: true })
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (data) => {
        console.log(data);
        csvData.push(data);
      })
      .on('end', async () => {
        const resultData = csvData.map((data) => {
          const match = resultId.indexOf(data.id);
          if (match === -1) return data;
        });

        if (!resultData.length) {
          process.send({
            status: 200,
            message: 'All users already exist',
          });
        }

        await db('results')
          .insert(resultData)
          .catch((error) => {
            process.send({
              status: '500',
              error: `Fail to import data into database!: ${error.message}`,
            });
          });

        process.send({
          status: '201',
          message: 'Upload successful',
        });
      });

    stream.pipe(csvStream);
  } catch (err) {
    process.send({
      status: '500',
      message: err.message || 'Something went wrong',
    });
  }
};

process.on('message', (message) => {
  const result = importCSV(message);
  process.send(result.message);
});
