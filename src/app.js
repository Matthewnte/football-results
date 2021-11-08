const express = require('express');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const v1router = require('./routes');
const logger = require('./config/winston');
const Exception = require('./utils/exception');
const errorHandler = require('./middleware/error');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Football result API',
      version: '1.0.0',
      discription: 'A simple Express football API',
    },
    server: [
      {
        url: 'https://localhost:4000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();
app.disable('x-powered-by');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const { json } = express;
app.use(json());

app.use(morgan('combined', { stream: logger.stream }));

app.get('/health', (req, res) => res.json({ status: 'up' }));

app.use('/v1', v1router);

app.all('*', (req, res, next) => {
  next(new Exception('Route not Found!', 404));
});

app.use(errorHandler);

module.exports = app;
