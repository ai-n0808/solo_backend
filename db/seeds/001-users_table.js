/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  await knex("users_table").del();
  await knex("users_table").insert([
    {
      id: 1,
      user_name: "Ai",
      password: await bcrypt.hash("ai0808", 10),
    },
  ]);
};
