const express = require('express');
const jwt = require('jsonwebtoken');

const Task = require('../models/task');

const router = express.Router();

function getUserId(req) {
  const token = req.cookies.jwt;

  if (token) {
    let res = jwt.verify(token, 'User');
    if (res.id) {
      return res.id;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

router.get('/tasks', (req, res) => {

  if (!getUserId(req)) {
    res.redirect('/signIn');
  }
  else {
    Task.find().sort({ createdAt: -1 })
      .then((result) => {
        console.log("All tasks: ", result);
        res.render('../views/tasks', { title: 'All Tasks', tasks: result });
      })
      .catch(err => console.log(err));
  }
});

router.get('/add', (req, res) => {
  if (!getUserId(req)) {
    res.redirect('./signIn');
  } else {
    res.render('../views/add', { title: 'Add a new task' });
  }
});

router.get('/:id', (req, res) => {

  if (!getUserId(req)) {
    res.redirect('/signIn');
  }
  const id = req.params.id;
  Task.findById(id)
    .then((result) => {
      res.render('../views/detail', { title: 'task details', task: result });
    })
    .catch(err => console.log(err));
});


router.post('/add', (req, res) => {

  const userId = getUserId(req);
  if (!userId) {
    res.redirect('/signIn');
  }

  const newTask = req.body;
  newTask["userId"] = userId;
  newTask["completed"] = false;

  console.log(newTask);
  const task = new Task(newTask);

  task.save()
    .then((result) => {
      res.redirect('/tasks');
    })
    .catch(err => console.log(err));
});

router.put('/:id', (req, res) => {

  const task = new Task({
    _id: req.params.id,
    description: req.params.description,
    completed: true
  });

  Task.updateOne({ _id: req.params.id }, task)
    .then((result) => {
      res.json({ redirect: '/tasks' })
    })
    .catch(err => console.log(err));

});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then((results) => {
      res.json({ redirect: '/tasks' });
    })
    .catch(err => console.log(err));

});

module.exports = router;