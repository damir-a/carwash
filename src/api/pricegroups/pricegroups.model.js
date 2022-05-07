const { Model } = require('objection');
const schema = require('./pricegroups.schema.json');
const { tableNames } = require('../../constants/tableNames');

class PriceGroups extends Model {
  static get tableName() {
    return tableNames.price_groups;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = PriceGroups;
