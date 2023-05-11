const database = require("../database/db");
const { hash } = require('bcrypt')
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
    let {
      "input-name-cad": name,
      "input-email-cad": email,
      "input-pass-cad": password,
    } = req.body;

    password = await hash(password, 8)
    
    const img_profile = req.file.path.replace(/\\/g, "\\\\");

    const emailExists = await verifyUser(email);

    if (emailExists[0]) {
      return {msg: 'Email está em uso. Escolha outro', status: 409}
    } else {
      const values = [
        `'${name}'`,
        `'${email}'`,
        `'${password}'`,
        `'${img_profile}'`,
      ];
      registerUserDatabase(values);
      return {msg: 'Cadastro realizado com sucesso', status: 200};
    }
  } catch (error) {
    console.log(error);
    return {msg: 'Ocorreu um erro ao realizar o cadastro, tente novamente', status: 500}
  }
};

module.exports = {
  validateUser,
};