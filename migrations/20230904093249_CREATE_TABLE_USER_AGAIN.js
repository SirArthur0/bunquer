/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('sobrenome').notNull()
        table.string('username').notNull().unique()
        table.string('password').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user')
};
