const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const auth = (req, res, next) => {
	try {
		const token = req.header('Authorization');
		if (!token) return res.status(400).json({ message: 'Invalid token' });
		jwt.verify(token, config.get('config.ACCESS_TOKEN_SECRET'), async (err, user) => {
			if (err) return res.status(400).json({ message: err });
			const verifiedUser = await User.findOne({ _id: user.id, token });
			if (!verifiedUser)
				return res.status(400).json({
					message: 'Multiple sessions are not allowed. Logout and login again to start a new session here.'
				});
			req.user = user;
			next();
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

module.exports = auth;
