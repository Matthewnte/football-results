const express = require('express');
const morgan = require('morgan');
const logger = require('./config/winston');

const app = express();
app.disable('x-powered-by');

const { json } = express;
app.use(json());

app.use(morgan('combined', { stream: logger.stream }));

app.get('/health', (req, res) => res.json({ status: 'up' }));

module.exports = app;
