const express = require('express')
const router = express.Router()
const taskController = require('../Controllers/taskController')

router.post('/config',taskController.configureTask);

module.exports = router;