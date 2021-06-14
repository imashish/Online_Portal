const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
	cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
		ref: 'Cart'
    },
	user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
		ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', Order, 'Order');