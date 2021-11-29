// const { v4: uuidv4 } = require('uuid');

function addDefaultColumns(knex, table) {
  table.increments().notNullable();
  table.timestamps(false, true);
  table.dateTime('deleted_at').defaultTo(null);
  table.uuid('uuid').unique().defaultTo(knex.raw('UUID()'));
}

module.exports = { addDefaultColumns };
