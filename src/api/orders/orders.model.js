const { Model } = require('objection');
const schema = require('./orders.schema.json');
const { tableNames } = require('../../constants/tableNames');

class Orders extends Model {
  static get tableName() {
    return tableNames.orders;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Orders;
