
exports.up = function(knex) {
  return knex.schema
    .createTable('items', tbl => {
      tbl.increments();

      tbl.string('name', 128).notNullable();
      tbl.string('description', 512).unique().notNullable();
      tbl.decimal('price', 10, 2).notNullable();

      tbl.string('location').notNullable();
    })
    .createTable('owners', tbl => {
      tbl.increments();

      tbl.text('username', 128).unique().notNullable();
      tbl.text('password', 128).unique.notNullable();

      tbl
        .integer('item')
        .unsigned()
        .references('items.id')
        .onDelete('RESTRICT')
        .onChange('CASCADE');
    })
    .createTable('locations', tbl => {
      tbl.increments();

      tbl.string('location', 128);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('locations')
    .dropTableIfExists('owners')
    .dropTableIfExists('items');
  
};
