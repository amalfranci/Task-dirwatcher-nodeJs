const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  watchDirectory: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    required: true,
  },
  magicString: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
