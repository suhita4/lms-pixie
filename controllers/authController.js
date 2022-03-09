const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'Email address not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'Password incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'Email address already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


const updateErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Pixie', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.signin_get = (req, res) => {
  res.render('signin');
}

module.exports.signup_post = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const user = await User.create({ name, email, username, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = updateErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.update_get = (req, res) => {
  res.render('dashboard');
}

module.exports.update_post = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const user = await User.create({ name, email, username, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.signin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/signIn');
}