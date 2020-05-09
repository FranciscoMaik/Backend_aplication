const express = require("express");

const routes = express.Router();

const MarketController = require("./controllers/MarketController");
const ProductController = require("./controllers/ProductController");
const ProductControllerUnic = require("./controllers/ProductControllerUnic");

//Rotas de mercado
routes.get("/market", MarketController.index);
routes.post("/market", MarketController.create);

//Rotas de produtos
routes.get("/product", ProductController.index);
routes.post("/product", ProductController.create);

//Rota de produto unico
routes.get("/productunic/:barcode", ProductControllerUnic.index);

module.exports = routes;
