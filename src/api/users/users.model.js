const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class Users extends Model {
  static get tableName() {
    return tableNames.users;
  }
}

module.exports = Users;
