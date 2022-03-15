const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const taskRoutes = require('./routes/taskRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

const dbURI = 'mongodb+srv://stige:database@pixie.dlpls.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log("Listening on port 3000");
  })
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/dashboard', requireAuth, function (req, res) {
  res.render('dashboard');
});

app.use(authRoutes);
app.use('/tasks', taskRoutes);
app.use('/course', courseRoutes)