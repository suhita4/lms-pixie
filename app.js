const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

const dbURI = 'mongodb+srv://stige:mongodb@task-manager.bkc32.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.redirect('/tasks');
});


app.use(taskRoutes);