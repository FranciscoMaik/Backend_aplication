const database = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { user, password } = request.body;
    const market = await database("admin")
      .where("user", "=", user, "and", "password", "=", password)
      .select("*")
      .first();
    return response.json(market);
  },
  async create(request, response) {
    const { user, password } = request.body;
    const [id] = await database("admin").insert({
      user,
      password,
    });

    return response.json({ id });
  },
};
