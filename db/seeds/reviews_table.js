/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("reviews_table").del();
  await knex("reviews_table").insert([
    {
      id: 1,
      user_id: 1,
      game_id: 8,
      rating: 5,
      review: "My favorite",
      created_at: new Date(),
    },
  ]);
};
