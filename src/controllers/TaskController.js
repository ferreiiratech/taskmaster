const model = require("../models/modelConfig");

const rootControll = (req, res) => {
  return res.render("index");
};

const registerUser = async (req, res) => {
  const { msg, status } = await model.validateUser(req, res);

  res.status(status).json(msg)

  //   console.log(req.file.path);
};

module.exports = {
  rootControll,
  registerUser,
};
