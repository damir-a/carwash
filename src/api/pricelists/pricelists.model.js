const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class Pricelists extends Model {
  static get tableName() {
    return tableNames.pricelist;
  }
}

module.exports = Pricelists;
