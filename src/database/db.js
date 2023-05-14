const Sequelize = require("sequelize");
require("dotenv").config();

const DATABASE = process.env.DATABASE_DB;
const USERNAME = process.env.USERNAME_DB;
const PASSWORD = process.env.PASSWORD_DB;
const HOST = process.env.HOST_DB;

const database = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

const User = database.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img_profile: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

const Task = database.define("tasks", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  due_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Date.now()
  },
  is_done: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Task.belongsTo(User, { foreignKey: "user_id" });

// verifica conexão
database
.authenticate()
.then(() => {
  console.log("MySQL conectado");
})
.catch((error) => {
  console.error("Erro ao conectar ao MySQL:", error);
});

module.exports = {
  database, 
  User,
  Task,
}