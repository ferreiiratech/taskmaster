const router = require('express').Router()
const TaskController = require('../controllers/TaskController')

router.get('/', TaskController.getAll)

module.exports = router