const { Model } = require('objection');
const schema = require('./cars.schema.json');
const { tableNames } = require('../../constants/tableNames');

class Cars extends Model {
  static get tableName() {
    return tableNames.cars;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Cars;
