
exports.up = function(knex, Promise) {
    return knex.schema.createTable('test', table =>{
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('email').notNull().unique()
      table.string('password').notNull()
      table.boolean('admin').notNull().defaultTo(false)
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('test')
  };
  