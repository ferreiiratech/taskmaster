const model = require("../models/modelConfig");

const rootControll = (req, res) => {
  return res.render("index");
};

const registerUser = async (req, res) => {
  const resposta = await model.validateUser(req, res);

  res.send(resposta);

  //   console.log(req.file.path);
};

module.exports = {
  rootControll,
  registerUser,
};
