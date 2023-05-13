const model = require("../models/modelConfig");

const rootControll = (req, res) => {
  return res.render("index");
};

const authRegisterUser = async (req, res) => {
  const { msg, status } = await model.validateUserRegister(req, res);

  res.status(status).json(msg);

  //   console.log(req.file.path);
};

const authLoginUser = async (req, res, next) => {
  const { msg, status } = await model.validateUserLogin(req, res);

  const dataUser = {
    msg: msg,
    user: {
      email: req.body["input-email"],
      password: req.body["input-pass"],
    },
  }

  if(status == 200){
    req.session.login = req.body["input-email"]

    res.render('home', {user: 'leonardo'})

  } else{
    res.redirect('/')
  }  
};

const authHome = async (req, res) => {
  return res.render('home')
};

module.exports = {
  rootControll,
  authRegisterUser,
  authLoginUser,
  authHome,
};