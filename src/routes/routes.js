const router = require("express").Router();
const multer = require("multer");
const middleware = require("../middlewares/middleware");
const TaskController = require("../controllers/TaskController");

const upload = multer({ storage: middleware.storage });

router.get("/", TaskController.rootControll);

// rota de registro
router.post("/auth/register", upload.single("image-input"), TaskController.authRegisterUser);

// rota de login
router.post("/user", TaskController.authLoginUser);

// rota de cookie login
router.get("/user", middleware.authLogin, TaskController.getAllTask);

// (req, res) => {
//     res.render('home')
// }

// rota create task
router.post('/taskcreate', TaskController.createTaskALL)

// // rota exemplo
// router.get("/test", middleware.test, (req, res) => {
//   res.render("test", { msg: "" });
// });

module.exports = router;