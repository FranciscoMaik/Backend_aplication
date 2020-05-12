// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "scorp",
      user: "postgres",
      password: "3081",
    },
    migrations: {
      tablaName: "knex_migrates",
      directory: __dirname + "/src/database/migrations",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tablaName: "knex_migrates",
      directory: __dirname + "/src/database/migrations",
    },
  },
};
