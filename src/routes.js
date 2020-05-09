const express = require("express");

const routes = express.Router();

const MarketController = require("./controllers/MarketController");
const ProductController = require("./controllers/ProductController");
const ProductControllerUnic = require("./controllers/ProductControllerUnic");
const AdminController = require("./controllers/AdminController");

//Rotas de mercado
routes.get("/market", MarketController.index);
routes.post("/market", MarketController.create);

//Rotas de produtos
routes.get("/product", ProductController.index);
routes.post("/product", ProductController.create);

//Rota de produto unico
routes.get("/productunic/:barcode", ProductControllerUnic.index);

//Rota de Administrador
routes.get("/admin", AdminController.index);
routes.post("/admin", AdminController.create);

module.exports = routes;
