const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class Clients extends Model {
  static get tableName() {
    return tableNames.clients;
  }
}

module.exports = Clients;
