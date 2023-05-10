const router = require('express').Router()
const multer = require('multer')
const { storage } = require('../middlewares/multerConfig')

const upload = multer({ storage: storage })

const TaskController = require('../controllers/TaskController')

router.get('/', TaskController.rootControll)

router.post('/register', upload.single('image-input'), TaskController.registerUser)

module.exports = router