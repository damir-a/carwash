const { v4: uuidv4 } = require('uuid');

function addDefaultColumns(table) {
  table.increments().notNullable();
  table.timestamps(false, true);
  table.dateTime('deleted_at').defaultTo(null);
  table.uuid('uuid').unique().defaultTo(uuidv4());
}

module.exports = { addDefaultColumns };
