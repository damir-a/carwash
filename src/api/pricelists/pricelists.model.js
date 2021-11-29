const { Model } = require('objection');
const schema = require('./pricelists.schema.json');
const { tableNames } = require('../../constants/tableNames');

class Pricelists extends Model {
  static get tableName() {
    return tableNames.pricelist;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Pricelists;
