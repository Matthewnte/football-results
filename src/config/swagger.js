const { port } = require('.');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Football result API',
      version: '1.0.0',
      discription: 'A simple Express football API',
    },
  },
  apis: ['./src/routes/*.js'],
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
};

module.exports = swaggerOptions;
