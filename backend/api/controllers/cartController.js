const Cart = require('../models/Cart');
const User = require('../models/User');
const Item = require('../models/Item');
const CartItems = require('../models/CartItems');
const Order = require('../models/Order');

exports.addToCart = async (req, res) => {
	try {
		const user = req.user;
		const itemId = req.body.item_id;
		const item = await Item.findOne({ _id: itemId });
		if (!item) return res.status(400).json({ message: 'Item does not exist.' });
		let cartId = null;
		const userWithCart = await Cart.findOne({ user_id: user.id, is_purchased: false });
		if (!userWithCart) {
			const newCart = new Cart({ user_id: user.id });
			await newCart.save();
			await User.findOneAndUpdate(
				{ _id: user.id },
				{
					cart_id: newCart._id
				},
				{ useFindAndModify: false }
			);
			cartId = newCart._id;
		} else {
			cartId = userWithCart._id;
		}
		const itemInCart = await CartItems.findOne({ item_id: itemId, cart_id: cartId });
		if (itemInCart) return res.status(400).json({ message: 'Item is already added in the cart.' });
		const cartItem = new CartItems({ cart_id: cartId, item_id: itemId });
		await cartItem.save();
		res.status(200).json({ message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.checkout = async (req, res) => {
	try {
		const userId = req.user.id;
		const cartId = req.params.cartId;
		let resultDocument = await Cart.findOneAndUpdate(
			{ _id: cartId, user_id: userId, is_purchased: false },
			{
				is_purchased: true
			},
			{ useFindAndModify: false, new: true }
		);
		if (!resultDocument) return res.status(400).json({ message: 'Please add items in your cart.' });
		const newOrder = new Order({ cart_id: cartId, user_id: userId });
		await newOrder.save();
		await User.findOneAndUpdate(
			{ _id: userId },
			{
				cart_id: null
			},
			{ useFindAndModify: false }
		);
		res.status(200).json({ message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.getCartItems = async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findOne({ _id: userId });
		const items = await CartItems.find({ cart_id: user.cart_id }, { _id: 1, cart_id: 1, item_id: 1 });
		if (!items.length) return res.status(400).json({ message: 'Cart is empty.' });
		res.status(200).json({ items, message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.getCarts = async (req, res) => {
	try {
		const allCarts = await Cart.find({});
		if (!allCarts.length) return res.status(400).json({ message: 'No carts available.' });
		res.status(200).json({ allCarts, message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
