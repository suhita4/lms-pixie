const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: String,
  },
  title: {
      type: String
    },
  description: {
      type: String
    },
  completed: {
      type: Boolean
    },
  deadline: {
    type: Date
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;