const express = require('express');
const morgan = require('morgan');

const app = express();
app.disable('x-powered-by');

const { json } = express;
app.use(json());

app.use(morgan('combined'));

app.get('/', (req, res) => res.json({ status: 'up' }));

module.exports = app;
