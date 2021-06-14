const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.route('/create').post(userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/list').get(userController.getUsers);

module.exports = router;
