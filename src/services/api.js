const axios = require("axios");

//api da empresa cosmos
const api = axios.create({
  baseURL: "https://api.cosmos.bluesoft.com.br/gtins/",
  headers: { "x-cosmos-token": "LBWH5jeI6EzFWot32htQ1w" },
});

module.exports = api;
