/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("favorites_table").del();
  await knex("favorites_table").insert([
    {
      user_id: 1,
      game_id: 8,
    },
  ]);
};
