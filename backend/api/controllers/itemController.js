const Item = require('../models/Item');

exports.createItem = async (req, res) => {
	try {
		const { name } = req.body;
		const item = await Item.findOne({ name });
		if (item) return res.status(400).json({ message: 'The item already exists.' });
		const newItem = new Item({ name });
		await newItem.save();
		res.status(200).json({ message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.getItems = async (req, res) => {
	try {
		const items = await Item.find({});
        if (!items.length) return res.status(400).json({ message: 'No items available.' });
        res.status(200).json({ items, message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
