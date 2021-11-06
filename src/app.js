const express = require('express');

const app = express();

const { json } = express;
app.use(json());

app.get('/health', (req, res) => res.json({ status: 'up' }));

module.exports = app;
