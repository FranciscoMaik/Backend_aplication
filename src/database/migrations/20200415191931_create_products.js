exports.up = function (knex) {
  return knex.schema.createTable("product", function (table) {
    table.string("gtin").primary();
    table.string("description").notNullable();
    table.string("barcode_image").notNullable();
    table.decimal("flagCountAny");
    table.decimal("flagCountMonth");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("product");
};
