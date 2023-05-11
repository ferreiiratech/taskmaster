const Sequelize = require("sequelize");
require("dotenv").config();

const DB = process.env.DATA_DB;
const USER = process.env.USER_DB;
const PASSWORD = process.env.PASS_DB;
const HOST = process.env.HOST_DB;

const database = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

database
  .authenticate()
  .then(() => {
    console.log("MySQL conectado");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MySQL:", error);
  });

module.exports = database;
