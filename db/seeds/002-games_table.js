/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("games_table").del();
  await knex("games_table").insert([
    {
      title: "Red, Blue, Green",
      platform: "Game Boy",
      release_date: 19960227,
      generation: 1,
    },
    {
      title: "Yellow",
      platform: "Game Boy",
      release_date: 19980912,
      generation: 1,
    },
    {
      title: "Gold, Silver",
      platform: "Game Boy Color",
      release_date: 19991121,
      generation: 2,
    },
    {
      title: "Crystal",
      platform: "Game Boy Color",
      release_date: 20001214,
      generation: 2,
    },
    {
      title: "Ruby, Sapphire",
      platform: "Game Boy Advance",
      release_date: 20021121,
      generation: 3,
    },
    {
      title: "FireRed, LeafGreen",
      platform: "Game Boy Advance",
      release_date: 20040129,
      generation: 3,
    },
    {
      title: "Emerald",
      platform: "Game Boy Advance",
      release_date: 20040916,
      generation: 3,
    },
    {
      title: "Diamond, Pearl",
      platform: "Nintendo DS",
      release_date: 20060928,
      generation: 4,
    },
    {
      title: "Platinum",
      platform: "Nintendo DS",
      release_date: 20080913,
      generation: 4,
    },
    {
      title: "HeartGold, SoulSilver",
      platform: "Nintendo DS",
      release_date: 20090912,
      generation: 4,
    },
    {
      title: "Black, White",
      platform: "Nintendo DS",
      release_date: 20100918,
      generation: 5,
    },
    {
      title: "Black2, White2",
      platform: "Nintendo DS",
      release_date: 20120623,
      generation: 5,
    },
    {
      title: "X, Y",
      platform: "Nintendo 3DS",
      release_date: 20131012,
      generation: 6,
    },
    {
      title: "OmegaRuby, AlphaSapphire",
      platform: "Nintendo 3DS",
      release_date: 20141121,
      generation: 6,
    },
    {
      title: "Sun, Moon",
      platform: "Nintendo 3DS",
      release_date: 20161118,
      generation: 7,
    },
    {
      title: "UltraSun, Ultra Moon",
      platform: "Nintendo 3DS",
      release_date: 20161118,
      generation: 7,
    },
    {
      title: "Let's go Pikachu!, Let's go Eevee!",
      platform: "Nintendo Switch",
      release_date: 20161118,
      generation: 7,
    },
    {
      title: "Sword, Shield",
      platform: "Nintendo Switch",
      release_date: 20191115,
      generation: 8,
    },
    {
      title: "Brilliant Diamond, Shining Pearl",
      platform: "Nintendo Switch",
      release_date: 20211119,
      generation: 8,
    },
    {
      title: "Legends: Arceus",
      platform: "Nintendo Switch",
      release_date: 20220128,
      generation: 8,
    },
    {
      title: "Scarlet, Violet",
      platform: "Nintendo Switch",
      release_date: 20221118,
      generation: 9,
    },
  ]);
};
