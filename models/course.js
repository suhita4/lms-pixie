const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String
  },
  description: {
      type: String
    },
  iframe: {
    type: String
  },
  completed: {
      type: Boolean
    }
  }, { timestamps: true });

  const Course = mongoose.model('course', courseSchema);

  module.exports = Course;