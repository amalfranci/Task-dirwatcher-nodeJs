const Task = require("../models/Task");
const fs = require('fs')
const path = require('path')


const dirWatcherService = require("../services/dirWatcherService");
const TaskRun = require("../models/TaskRun");

exports.configureTask = async (req, res) => {
  try {
    const { watchDirectory, interval, magicString } = req.body;

    if (!watchDirectory) {
      return res.status(400).send('Watch directory path is required.');
    }

    const fullpath = path.join('./', watchDirectory);
    fs.mkdir(fullpath, { recursive: true }, (err) => {
      if (err) {
        console.error('Failed to create directory:', err);
        return res.status(500).send('Failed to create directory');
      }
    });

  
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

  
    res.status(200).json({ message: "Task configured successfully", task });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: "Server error", err });
  }
};

exports.getTaskRuns = async (req, res) => {
  try {
    const taskRuns = await TaskRun.find();
    if (taskRuns?.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json({ message: "Tasks collected successfully", taskRuns });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.startTask = (req, res) => {
  try {
    const task = req.body;
    console.log(task);
    dirWatcherService.startTask(task);
    res.status(200).json({ message: "Task started manually" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.stopTask = (req, res) => {
  try {
    dirWatcherService.stopTask();
    res.status(200).json({ message: "Task stopped manually" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


