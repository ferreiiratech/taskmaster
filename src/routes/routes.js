const router = require('express').Router()
const multer = require('multer')
const { storage } = require('../middlewares/multerConfig')
const authLogin = require('../middlewares/authLogin')

const upload = multer({ storage: storage })

const TaskController = require('../controllers/TaskController')

router.get('/',  TaskController.rootControll)

router.post('/auth/register', upload.single('image-input'), TaskController.authRegisterUser)

router.post('/user', TaskController.authLoginUser)

router.get('/user', authLogin)

module.exports = router