const { db } = require('./src/config');

const { client, username, password, host, port, name } = db;

const connection = `${client}://${username}:${password}@${host}:${port}/${name}`;

module.exports = {
  client,
  connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
