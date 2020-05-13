exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable("market", function (table) {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("name").notNullable();
    table.string("street").notNullable();
    table.string("district").notNullable();
    table.string("phone");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("market");
};
