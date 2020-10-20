
exports.up = function(knex) {
  return knex.schema
    .createTable('locations', tbl => {
      tbl.increments();

      tbl.string('location', 128);
    })
    .createTable('items', tbl => {
      tbl.increments();

      tbl.string('name', 128).notNullable();
      tbl.string('description', 512).unique().notNullable();
      tbl.decimal('price', 10, 2).notNullable();

      tbl
        .integer('location')
        .unsigned()
        .references('locations.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    })
    .createTable('owners', tbl => {
      tbl.increments();

      tbl.text('username', 128).unique().notNullable();
      tbl.text('password', 128).unique().notNullable();

      tbl
        .integer('item')
        .unsigned()
        .references('items.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('owners')
    .dropTableIfExists('items')
    .dropTableIfExists('locations');
};
