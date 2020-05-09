exports.up = function (knex) {
  return knex.schema.createTable("admin", function (table) {
    table.increments();
    table.string("user");
    table.string("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("admin");
};
