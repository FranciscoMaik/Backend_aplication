
exports.up = function(knex) {
    return knex.schema.createTable('market', function(table){
        table.increments();
        table.string('name').notNullable();
        table.string('street').notNullable();
        table.string('district').notNullable();
        table.string('phone');
        table.decimal('flagCountAny');
        table.decimal('flagCountMonth');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('market');
};
