const mongoose = require("mongoose");
const Task = require("../models/Task");
const dirWatcherService = require("../services/dirWatcherService");
const logger = require("./logger");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB, {
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
        logger.info("MongoDB connected....");

        Task.findOne().then((task) => {
          if (task) {
            dirWatcherService.startTask(task);
          } else {
            dirWatcherService.startTask({
              watchDirectory: process.env.WATCH_DIRECTORY,
              interval: parseInt(process.env.INTERVAL),
              magicString: process.env.MAGIC_STRING,
            });
          }
        });
      })
      .catch((err) => {
        logger.error(err.message);
        console.log("Failed to connect to MongoDB", err);
        process.exit(1);
      });
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
