const database = require("../database/connection");

module.exports = {
  async index(request, response) {
    const market = await database("market").select("*");
    return response.json(market);
  },
  async create(request, response) {
    const { name, street, district, phone } = request.body;
    await database("market").insert({
      name,
      street,
      district,
      phone,
    });
    return response.status(200).send();
  },

  async delete(request, response) {
    const { id } = request.params;
    await database("market").where({ id }).del();
    return response.status(200).send();
  },
};
