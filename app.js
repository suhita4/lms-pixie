const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


const taskRoutes = require('./routes/taskRoutes');

const app = express();

const dbURI = 'mongodb+srv://stige:trial@lms.kkiqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 8080);
  })
  .catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.get('/', function (req, res) {
  res.render('home');
});

app.get('/signUp', function (req, res) {
  res.render('signUp');
});

app.get('/signIn', function (req, res) {
  res.render('signIn');
});

app.get('/dashboard', function (req, res) {
  res.render('dashboard');
});

app.get('/course', function (req, res) {
  res.render('course');
});

app.get('/tasks', function (req, res) {
  res.render('tasks');
});

app.use('/tasks', taskRoutes);