/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reviews_table", function (table) {
    table.increments("id").primary();
    table.foreign("user_id").references("id").inTable("users_table");
    table.foreign("game_id").references("id").inTable("games_table");
    table.integer("rating");
    table.text("review");
    table.date("created_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("reviews_table");
};
