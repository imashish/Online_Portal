const express = require('express');
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');
const router = express.Router();

router.route('/add').post(auth, cartController.addToCart);
router.route('/:cartId/complete').post(auth, cartController.checkout);
router.route('/cartItems').get(auth, cartController.getCartItems);
router.route('/list').get(cartController.getCarts);

module.exports = router;