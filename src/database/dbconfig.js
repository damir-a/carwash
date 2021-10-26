const knex = require('knex');
const knexconfig = require('../../knexfile');

const currentEnv = process.env.NODE_ENV;
const knexCfg = knexconfig[currentEnv];

const db = knex(knexCfg);

module.exports = db;
