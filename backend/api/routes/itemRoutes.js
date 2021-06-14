const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.route('/create').post(itemController.createItem);
router.route('/list').get(itemController.getItems);

module.exports = router;