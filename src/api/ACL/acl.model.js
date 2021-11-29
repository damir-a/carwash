const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class ACL extends Model {
  static get tableName() {
    return tableNames.ACL;
  }
}

module.exports = ACL;
