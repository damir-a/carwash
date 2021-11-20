function addDefaultColumns(table) {
  table.increments().notNullable();
  table.timestamps(false, true);
  table.dateTime('deleted_at').defaultTo(null);
  table.uuid('uuid').unique();
}

module.exports = { addDefaultColumns };
