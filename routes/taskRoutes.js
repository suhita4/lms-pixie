const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');
const routes = express.Router();

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


routes.get('/', (req, res) => {

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

routes.get('/add', (req, res) => {
    res.render('../views/add', { title: 'add a new task' });
});

routes.get('/:id', (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then((result) => {
      res.render('../views/detail', { title: 'task details', task: result });
    })
    .catch(err => console.log(err));
});

routes.post('/', (req, res) => {
  const newTask = req.body;
  newTask["completed"] = false;

  console.log(newTask);
  const task = new Task(newTask);

  task.save()
    .then((result) => {
      res.redirect('/tasks');
    })
    .catch(err => console.log(err));
});

routes.put('/:id', (req, res) => {

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

routes.delete('/:id', (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then((results) => {
      res.json({ redirect: '/tasks' });
    })
    .catch(err => console.log(err));

});

module.exports = routes;