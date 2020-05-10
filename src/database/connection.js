const knex = require("knex");
const configuration = require("../../knexfile");

const database = knex(configuration.production);

module.exports = database;
