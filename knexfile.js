const { db } = require('./src/config');
const { v4: uuidv4 } = require('uuid');

const { client, username, password, host, name } = db;
const databaseName = process.env.NODE_ENV === 'test' ? uuidv4() : name;
const db_host = process.env.NODE_ENV === 'test' ? 'localhost' : host;

module.exports = {
  client,
  connection: {
    host: db_host,
    database: databaseName,
    user: username,
    password,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
