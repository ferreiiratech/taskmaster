const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/users/img");
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});

const authLogin = async (req, res, next) => {
  if (req.session.login) {
    next();
  } else{
    res.redirect('/')
  }
};

const test = (req, res, next) => {
  res.redirect("/");
};

module.exports = {
  storage,
  authLogin,
  test,
};