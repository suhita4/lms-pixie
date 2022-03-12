const express = require('express');
const jwt = require('jsonwebtoken');
const Course = require('../models/course');
const router = express.Router();

router.get('/', (req, res) => {
  Course.find().sort({ createdAt: -1 })
      .then((result) => {
        console.log("All lessons: ", result);
        res.render('../views/course', { title: 'All lessons', courses: result });
      })
      .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then((result) => {
      res.render('../views/lesson', { title: 'Lesson details', course: result });
    })
    .catch(err => console.log(err));
});

router.put('/:id', (req, res) => {

  const course = new Course({
    _id: req.params.id,
    description: req.params.description,
    completed: true
  });

  Course.updateOne({ _id: req.params.id }, course)
    .then((result) => {
      res.json({ redirect: '/course' })
    })
    .catch(err => console.log(err));

});

module.exports = router;