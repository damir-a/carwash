const { Model } = require('objection');
const schema = require('./acl.schema.json');
const { tableNames } = require('../../constants/tableNames');

class ACL extends Model {
  static get tableName() {
    return tableNames.ACL;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = ACL;
