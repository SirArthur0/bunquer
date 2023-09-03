
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('user', table => {
    table.boolean('adm').notNull().defaultTo(false)
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.alterTable('user', table => {
    table.dropColumn('adm')
  })
};
