
exports.up = function(knex) {
  return knex.schema    
    .createTable("owners", tbl => {
      tbl.increments(); 

      tbl.text('username', 128).unique().notNullable();
      tbl.text('password', 128).unique().notNullable();

    })
    .createTable('items', tbl => {
      tbl.increments();

      tbl.string('name', 128).notNullable();
      tbl.string('description', 512).unique().notNullable();
      tbl.decimal('price', 10, 2).notNullable();
      tbl.string('location', 128).notNullable();
  
      tbl
        .integer('owner')
        .unsigned()
        .references('owners.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('items')
    .dropTableIfExists('owners')
    .dropTableIfExists('locations');
};
