const fs = require("fs");
const path = require("path");
const schedule = require("node-schedule");
const TaskRun = require("../models/TaskRun");
const mongoose = require("mongoose");
const logger = require("../utils/logger");

let currentTask;
let job;

const startTask = (task) => {
  if (job) job.cancel();

  currentTask = {
    watchDirectory: task.watchDirectory || process.env.WATCH_DIRECTORY,
    interval: task.interval || parseInt(process.env.INTERVAL),
    magicString: task.magicString || process.env.MAGIC_STRING,
    _id: task._id || new mongoose.Types.ObjectId(),
  };

  job = schedule.scheduleJob(
    `*/${currentTask.interval / 1000} * * * * *`,
    async () => {
      await executeTask();
    }
  );
  logger.info("Directory watch Task Started");
  console.log("Directory watch task started");
};

const stopTask = () => {
  if (job) {
    job.cancel();
    logger.info("Directory watch task stoped");
    console.log("Directory watch task stopped");
  }
};

const restartTask = (task) => {
  stopTask();
  startTask(task);
};

const executeTask = async () => {
  const taskRun = new TaskRun({
    taskId: currentTask._id,
    startTime: new Date(),
  });
  const watchDirectory = path.resolve(currentTask.watchDirectory);
  let filesAdded = [];
  let filesDeleted = [];
  let magicStringCount = 0;

  try {
    const currentFiles = new Set(fs.readdirSync(watchDirectory));
    const previousRun = await TaskRun.findOne({ taskId: currentTask._id }).sort(
      { startTime: -1 }
    );
    const previousFiles = new Set(previousRun ? previousRun.filesAdded : []);

    filesAdded = [...currentFiles].filter((file) => !previousFiles.has(file));
    filesDeleted = [...previousFiles].filter((file) => !currentFiles.has(file));

    for (const file of currentFiles) {
      const filePath = path.join(watchDirectory, file);
      const content = fs.readFileSync(filePath, "utf-8");
      magicStringCount += (
        content.match(new RegExp(currentTask.magicString, "g")) || []
      ).length;
    }
    taskRun.endTime = new Date();
    taskRun.runtime = taskRun.endTime - taskRun.startTime;
    taskRun.filesAdded = [...currentFiles];
    taskRun.filesDeleted = filesDeleted;
    taskRun.magicStringCount = magicStringCount;
    taskRun.status = "success";
  } catch (err) {
    taskRun.status = "failed";
    logger.error(err.message);
  } finally {
    await taskRun.save();
  }
};

module.exports = { startTask, stopTask, restartTask };
