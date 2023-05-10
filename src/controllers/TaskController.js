const rootControll = (req, res) => {
  return res.render("index");
};

const registerUser = (req, res) => {
  res.send("Cadastro realizado com sucesso");
  console.log(req.file.path);
};

module.exports = {
  rootControll,
  registerUser,
};
