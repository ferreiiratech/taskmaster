const express = require("express");
const path = require("path");
const routes = require("./src/routes/routes")

const app = express();

// Config da pasta "views" e do motor de visualização
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// config local arquivos frontend
app.use(express.static(path.join(__dirname, "src/public")));

// config rotas
app.use(routes)

module.exports = app