const app = require('./app');
const { port } = require('./config');
const logger = require('./config/winston');

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
