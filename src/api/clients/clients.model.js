const { Model } = require('objection');
const schema = require('./clients.schema.json');
const { tableNames } = require('../../constants/tableNames');

class Clients extends Model {
  static get tableName() {
    return tableNames.clients;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Clients;
