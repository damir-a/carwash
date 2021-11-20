const { Model } = require('objection');

class ACL extends Model {
  static get tableName() {
    return 'ACL';
  }
}

module.exports = ACL;
