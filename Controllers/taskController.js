const Task = require('../models/Task')

const dirWatcherService = require('../services/dirWatcherService')
const TaskRun = require('../models/TaskRun')


exports.configureTask = async (req, res) => {
    
    try {
        
        const { watchDirectory, interval, magicString } = req.body;

        let task = await Task.findOne();

        if (task) {
            task.watchDirectory = watchDirectory;
            task.interval = interval;
            task.magicString = magicString;
        } else {
            task = new Task({ watchDirectory, interval, magicString });
        }
        await task.save();
        dirWatcherService.restartTask(task);
        res.status(200).json({message:"Task configured sucesscessfull",task})
    }
    catch (err)
    {
        res.status(500).json({messsage: "Server error",err})
    }
}


