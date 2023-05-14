const model = require("../models/modelConfig");
const database = require("../database/db");

const rootControll = (req, res) => {
  return res.render("index");
};

const authRegisterUser = async (req, res) => {
  const { msg, status } = await model.validateUserRegister(req, res);
  res.redirect("/");
};

const authLoginUser = async (req, res, next) => {
  const { msg, status } = await model.validateUserLogin(req, res);

  const dataUser = {
    msg: msg,
    user: {
      email: req.body["input-email"],
      password: req.body["input-pass"],
    },
  };

  if (status == 200) {
    req.session.login = req.body["input-email"];

    res.redirect("/user");
  } else {
    res.redirect("/");
  }
};

const authHome = async (req, res) => {
  return res.render("home");
};

var userEmailGeral

const getAllTask = async (req, res) => {
  let tasklist 
  try {
    userEmailGeral = req.session.login;

    database.User.findOne({ where: { email: userEmailGeral } }).then(async (user) => {
      if (!user) {
        throw new Error(`User with email ${userEmailGeral} not found`);
      }
      tasklist = await database.Task.findAll({
        where: { user_id: user.id },
        attributes: ["description"],
      });
      
      // const data = new Date().toLocaleString('pt-BR')
      
      res.render('home', {
        tasklist,
        img_profile: user.img_profile // add img_profile to the data object
      })
    });
  } catch (error) {
    console.log(error);
  }
};

const createTaskALL = async (req, res) => {
  const task = req.body;

  if (!task) {
    return res.redirect("/user");
  }

  const data = Date.now()

  try {
    
    const user = await database.User.findOne({ where: { email: userEmailGeral } });

    if (!user) {
      throw new Error(`User with email ${userEmailGeral} not found`);
    }

    await database.Task.create({
      description: task.task,
      due_date: data,
      is_done: '0',
      user_id: user.id
    });

    return res.redirect("/user");
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  rootControll,
  authRegisterUser,
  authLoginUser,
  authHome,
  createTaskALL,
  getAllTask,
};