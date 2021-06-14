const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const router = express.Router();

router.route('/orderHistory').get(auth, orderController.orderHistory);
router.route('/list').get(orderController.getOrders);

module.exports = router;