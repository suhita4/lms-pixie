const express = require('express');
const jwt = require('jsonwebtoken');
const Course = require('../models/course');
const router = express.Router();

function getUserId(req) {
  const token = req.cookies.jwt;

  if (token) {
    let res = jwt.verify(token, 'Pixie');
    if (res.id) {
      return res.id;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

router.get('/', (req, res) => {
  if (!getUserId(req)) {
    res.redirect('/signIn');
  }
  else {
  Course.find().sort({ createdAt: -1 })
      .then((result) => {
        console.log("All lessons: ", result);
        res.render('../views/course', { title: 'All lessons', courses: result });
      })
      .catch(err => console.log(err));
    }
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
      res.json({ redirect: '/course/:id' })
    })
    .catch(err => console.log(err));

});

module.exports = router;