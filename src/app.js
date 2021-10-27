const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { Model } = require('objection');
const db = require('./database/dbconfig');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const userApi = require('./api/users/users.routes');

const app = express();
Model.knex(db);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);
app.use('/api/v1/users', userApi);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
