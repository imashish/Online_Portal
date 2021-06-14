const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema({
	is_purchased: {
		type: Boolean,
        required: true,
        default: false
	},
	user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
		ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', Cart, 'Cart');
