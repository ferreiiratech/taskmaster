const database = require("../database/db");
const COLUMNS = ["name", "email", "password", "img_profile"];

const registerUserDatabase = (values) => {
  const INSERT_QUERY = `INSERT INTO users (${COLUMNS.join(", ")}) VALUES (${values})`;
  database.query(INSERT_QUERY, (error, results, fields) => {
    if (error) throw error;
  });
};

const verifyUser = async (email) => {
  const SELECT_QUERY = `SELECT * FROM users WHERE email = '${email}'`;
  try {
    const results = await database.query(SELECT_QUERY);
    return results[0];
  } catch (error) {
    throw error;
  }
};

const validateUser = async (req, res) => {
  try {
    const {
      "input-name-cad": name,
      "input-email-cad": email,
      "input-pass-cad": password,
    } = req.body;

    const img_profile = req.file.path.replace(/\\/g, "\\\\");

    const emailExists = await verifyUser(email);

    if (emailExists[0]) {
      return "Email está em uso. Escolha outro";
    } else {
      const values = [
        `'${name}'`,
        `'${email}'`,
        `'${password}'`,
        `'${img_profile}'`,
      ];
      registerUserDatabase(values);
      return "Cadastro realizado com sucesso";
    }
  } catch (error) {
    console.log(error);
    res.send("Ocorreu um erro ao realizar o cadastro");
  }
};

module.exports = {
  validateUser,
};