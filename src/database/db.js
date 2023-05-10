const Sequelize = require("sequelize");

const database = new Sequelize("taskmaster_db", "admin", "#17200118", {
  host: "databasecentral.cpqhl5dxjiin.sa-east-1.rds.amazonaws.com",
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
