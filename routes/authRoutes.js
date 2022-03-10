const { Router } = require('express');
const authController = require('../controllers/authController');
const User = require('../models/User');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/signin', authController.signin_get);
router.post('/signin', authController.signin_post);
router.get('/logout', authController.logout_get);
router.get('/dashboard', authController.update_get);
router.get('/update', authController.update_post);


/*router.put('/dashboard', (req, res) => {

  const updatedUser = new User({
    _id: req.params.id,
  });

  User.updateOne({ _id: req.params.id }, updatedUser)
    .then((result) => {
      res.json({ redirect: '/dashboard' })
    })
    .catch(err => console.log(err));

});*/

module.exports = router;