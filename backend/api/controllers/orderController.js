const Order = require('../models/Order');

exports.orderHistory = async (req, res) => {
	try {
		const user = req.user;
		const ordersPlaced = await Order.find({ user_id: user.id }, { _id: 1, cart_id: 1, user_id: 1 });
		if (!ordersPlaced.length) return res.status(400).json({ message: 'No orders placed.' });
		res.status(200).json({ ordersPlaced, message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.getOrders = async (req, res) => {
	try {
		const allOrders = await Order.find({});
		if (!allOrders.length) return res.status(400).json({ message: 'No orders available.' });
		res.status(200).json({ allOrders, message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
