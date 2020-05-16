const database = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { user, password } = request.body;
    console.log(user, password);
    const admin = await database("admin")
      .where("user", "=", user, "and", "password", "=", password)
      .select("*")
      .first();
    return response.json(admin);
  },
  async create(request, response) {
    const { user, password } = request.body;
    await database("admin").insert({
      user,
      password,
    });

    return response.status(200).send();
  },

  async delete(request, response) {
    const { user } = request.params;
    await database("admin").where({ user }).del();
    return response.status(200).send();
  },
};
