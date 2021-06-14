const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		token: {
			type: String,
			default: null
		},
		cart_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Cart',
			default: null
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', User, 'User');
