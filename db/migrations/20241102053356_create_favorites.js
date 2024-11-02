/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("favorites_table", function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.integer("game_id").notNullable();
    table.foreign("user_id").references("id").inTable("users_table");
    table.foreign("game_id").references("id").inTable("games_table");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("favorites_table");
};
