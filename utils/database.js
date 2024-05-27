const mongoose = require("mongoose");
const Task = require("../models/Task");
const dirWatcherService = require("../services/dirWatcherService");
const logger = require("./logger");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amalfrancis744:amal12345@freshtohome.n7mqs88.mongodb.net/freshtohome?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );

    console.log("Connected to MongoDB");
    logger.info("MongoDB connected....");

    

    const task = await Task.findOne();
    if (task) {
      dirWatcherService.startTask(task);
    } else {
      dirWatcherService.startTask({
        watchDirectory: process.env.WATCH_DIRECTORY,
        interval: parseInt(process.env.INTERVAL, 10),
        magicString: process.env.MAGIC_STRING,
      });
    }
  } catch (err) {
    logger.error(err.message);
    console.log("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
