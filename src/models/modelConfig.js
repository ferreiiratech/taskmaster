const database = require("../database/db");
const bcrypt = require("bcrypt");
require("dotenv").config();

// criação de novo usuário
const registerUserDatabase = (values) => {
  database.User.create({
    name: values[0],
    email: values[1],
    password: values[2],
    img_profile: values[3],
  })
    .then(() => {
      console.log("Usuário registrado");
    })
    .catch((error) => {
      console.error(error);
    });
};

// Verifica se o usuário existe no db
const verifyUser = async (email) => {
  try {
    const results = await database.User.findAll({
      where: {
        email: email,
      },
    });
    return results;
  } catch (error) {
    console.log(error);
  }
};

// retorna a senha do usuário baseado no email
const verifyPassword = async (email) => {
  try {
    const results = await database.User.findAll({
      attributes: ["password"],
      where: {
        email: email,
      },
    });
    return results;
  } catch (error) {
    console.log(error);
  }
};

// validações para a criação do usuário
const validateUserRegister = async (req, res) => {
  let {
    "input-name-cad": name,
    "input-email-cad": email,
    "input-pass-cad": password,
  } = req.body;

  const img_profile = req.file.path.replace(/\\/g, "\\\\");

  if (!name || !email || !password) {
    return { msg: "Preencha todos os campos", status: 422 };
  }

  try {
    password = await bcrypt.hash(password, 8);

    const emailExists = await verifyUser(email);

    if (emailExists.length > 0) {
      return { msg: "Email está em uso. Escolha outro", status: 409 };
    }

    const values = [name, email, password, img_profile];
    
    registerUserDatabase(values);
    return { msg: "Cadastro realizado com sucesso", status: 201 };
  } catch (error) {
    console.log(error);
    return {
      msg: "Ocorreu um erro ao realizar o cadastro, tente novamente",
      status: 500,
    };
  }
};

// login do usuário
const validateUserLogin = async (req, res) => {
  
  const { "input-email": email, "input-pass": password } = req.body;

  if (!email || !password) {
    return { msg: "Preencha todos os campos", status: 422 };
  }

  try {
    const emailExists = await verifyUser(email);

    const passwordDB = await verifyPassword(email);

    if (emailExists.length == 0) {
      return { msg: "Usuário ou senha inválidos", status: 401 };
    }
    
    const passwordConfere = await bcrypt.compare(
      password,
      passwordDB[0].dataValues.password
    );

    if (!passwordConfere) {
      return { msg: "Usuário ou senha inválidos", status: 401 };
    }
    
    return { msg: "Usuário autenticado com sucesso", status: 200};
  } catch (error) {
    console.log(error);
    return {
      msg: "Ocorreu um erro ao fazer login, tente novamente",
      status: 500,
    };
  }
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
};