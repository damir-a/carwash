const { addDefaultColumns } = require('../../src/lib/tableutils');
const { tableNames, columnNames } = require('../../src/constants/tableNames');

/**
 * @param {import('knex')} knex
 */

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.users, (table) => {
      addDefaultColumns(knex, table);
      table.string(columnNames.email, 55).notNullable().unique();
      table.string(columnNames.name, 255).notNullable();
      table.string(columnNames.password, 255).notNullable();
      table.integer(columnNames.ACL).defaultTo(0);
    }),
    knex.schema.createTable(tableNames.ACL, (table) => {
      addDefaultColumns(knex, table);
      table.string(columnNames.title, 50);
      table.boolean(columnNames.read);
      table.boolean(columnNames.write);
      table.boolean(columnNames.admin);
    }),
    knex.schema.createTable(tableNames.cars, (table) => {
      addDefaultColumns(knex, table);
      table.string(columnNames.make, 100).notNullable();
      table.string(columnNames.makeRU, 100).notNullable();
      table.string(columnNames.model, 100);
      table.string(columnNames.logo, 1500);
    }),
    knex.schema.createTable(tableNames.clients, (table) => {
      addDefaultColumns(knex, table);
      table.string(columnNames.title, 255).notNullable();
      table.string(columnNames.phone, 99);
      table.integer(columnNames.price_id).notNullable();
      table.dateTime(columnNames.reg_date).defaultTo(knex.fn.now());
      table.integer(columnNames.car);
      table.string(columnNames.GRZ, 10);
      table.boolean(columnNames.isJUR);
    }),
    knex.schema.createTable(tableNames.pricelist, (table) => {
      addDefaultColumns(knex, table);
      table.integer(columnNames.price_id).notNullable().unsigned().references('id')
        .inTable(tableNames.price_groups);
      table.string(columnNames.service_title, 255);
      table.integer(columnNames.group, 10).notNullable().unsigned().references('id')
        .inTable(tableNames.service_groups);
      table.integer(columnNames.price);
      table.time(columnNames.time_to_wash);
      table.integer(columnNames.client_id);
    }),
    knex.schema.createTable(tableNames.service_groups, (table) => {
      addDefaultColumns(knex, table);
      table.string(columnNames.title, 255);
      table.string(columnNames.description, 1000);
    }),
    knex.schema.createTable(tableNames.orders, (table) => {
      addDefaultColumns(knex, table);
      table.integer(columnNames.client_id).notNullable();
      table.integer(columnNames.order_id).notNullable();
      table.integer(columnNames.service_id).notNullable();
      table.integer(columnNames.user_id).notNullable();
      table.integer(columnNames.car_id).notNullable();
    }),
    knex.schema.createTable(tableNames.price_groups, (table) => {
      addDefaultColumns(knex, table);
      table.string(columnNames.title);
      table.string(columnNames.description);
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all(
    Object.values(tableNames).map((t) => knex.schema.dropTable(t)),
  );
};
