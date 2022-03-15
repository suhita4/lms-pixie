const authController = require('../controllers/authController');
const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const { findByIdAndUpdate } = require("../models/User");

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/signin', authController.signin_get);
router.post('/signin', authController.signin_post);
router.get('/logout', authController.logout_get);

router.get('/edit/:id', authController.edit_get)
router.post('/edit/:id', authController.edit_post)

module.exports = router;