const express = require('express')
const router = express.Router();
const UserController = require('../../controllers/user-controller');

router.post('/signup', UserController.create);
router.post('/signin', UserController.signIn);
// router.delete('/signup', UserController.destroy);

module.exports = router;
