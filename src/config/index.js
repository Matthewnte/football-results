require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  opt: process.env.OPT,

  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    client: process.env.DB_CLIENT,
  },
};
