const express = require('express');

const { authenticate } = require('./middleware/auth');

const app = express();
app.use(express.json());

// require JWT for all routes
app.use(authenticate);

app.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
