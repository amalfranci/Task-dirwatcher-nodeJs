const express = require('express')
const router = express.Router()
const taskController = require('../Controllers/taskController')

router.post('/config', taskController.configureTask);
router.get('/runs', taskController.getTaskRuns)
router.post('/start', taskController.startTask);
router.post('/stop', taskController.stopTask);

module.exports = router;