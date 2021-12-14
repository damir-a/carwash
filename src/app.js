const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { Model } = require('objection');
const db = require('./database/dbconfig');

require('dotenv').config();

const middlewares = require('./middlewares');
const userApi = require('./api/users/users.routes');
const ACL = require('./api/ACL/acl.routes');
const clients = require('./api/clients/clients.routes');
const pricelists = require('./api/pricelists/pricelists.routes');
const servicegroups = require('./api/servicegroups/servicegroups.routes');
const acl = require('./api/ACL/acl.routes');
const orders = require('./api/orders/orders.routes');
const auth = require('./api/auth/auth');
const login = require('./api/login');

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
app.use('/api/v1/login', login);
app.use(auth);
app.use('/api/v1/users', userApi);
app.use('/api/v1/acl', ACL);
app.use('/api/v1/clients', clients);
app.use('/api/v1/pricelists', pricelists);
app.use('/api/v1/servicegroups', servicegroups);
app.use('/api/v1/acl', acl);
app.use('/api/v1/orders', orders);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
