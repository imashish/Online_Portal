const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartItems = new Schema({
	cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
		ref: 'Cart'
    },
	item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
		ref: 'Item'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CartItems', CartItems, 'CartItems');