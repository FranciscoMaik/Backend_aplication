const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const app = express();
const server = require("http").Server(app);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
