const { Model } = require('objection');
const schema = require('./servicegroups.schema.json');
const { tableNames } = require('../../constants/tableNames');

class Servicegroups extends Model {
  static get tableName() {
    return tableNames.service_groups;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Servicegroups;
