const { Model } = require('objection');
const schema = require('./users.schema.json');
const { tableNames } = require('../../constants/tableNames');

class Users extends Model {
  static get tableName() {
    return tableNames.users;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Users;
