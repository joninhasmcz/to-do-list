const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status: {type: String, required: true, default: 'pendente'},
    description: String,
    created_at: {type: Date, default: Date.now}
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;

