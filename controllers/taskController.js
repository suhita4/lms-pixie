const jwt = require('jsonwebtoken');
const Task = require('../models/task');


function allTasks(req, res) {

  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'Pixie', (err, decodedToken) => {
      if (err) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/signIn');
        next();
      } else {
        Task.findById(decodedToken.id)
          .then((result) => {
            console.log("All tasks: ", result);
            res.render('/tasks', { title: 'All Tasks', tasks: result });
          })
          .catch(errr => console.log(errr));
      }
    })
  } else {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/signIn');
  }


}

module.exports = allTasks;