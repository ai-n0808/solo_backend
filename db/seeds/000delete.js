/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("reviews_table").del();
  await knex("favorites_table").del();
  await knex("users_table").del();
  await knex("games_table").del();
};
