const mongoose = require('mongoose');

const TaskRunSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: Date,
    runtime: Number,
    filesAdded: [String],
    filesDeleted: [String],
    magicStringCount: Number,
    status: {
        type: String,
        enum: ['success', 'failed'],
        required: true,
    },
});

module.exports = mongoose.model('TaskRun', TaskRunSchema);
