const express = require('express');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const v1router = require('./routes');
const logger = require('./config/winston');
const Exception = require('./utils/exception');
const errorHandler = require('./middleware/error');
const swaggerConfig = require('./config/swagger');
const { env } = require('./config');

const specs = swaggerJsDoc(swaggerConfig);

const app = express();
app.disable('x-powered-by');

const { json } = express;
app.use(json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

if (env !== 'test') app.use(morgan('combined', { stream: logger.stream }));

app.get('/health', (req, res) => res.json({ status: 'up' }));

app.use('/v1', v1router);

app.all('*', (req, res, next) => {
  next(new Exception('Route not Found!', 404));
});

app.use(errorHandler);

module.exports = app;
