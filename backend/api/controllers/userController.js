const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.createUser = async (req, res) => {
	try {
		const { name, username, password } = req.body;
		const user = await User.findOne({ username });
		if (user) return res.status(400).json({ message: 'The username already exists.' });

		if (!name.match(/^[A-Za-z\s]+$/))
			return res.status(400).json({
				message: 'Special characters or numbers are not allowed in name.'
			});

		if (!username.match(/^([\w.-]+)@(\[(\d{1,3}\.){3}|(([a-zA-Z\d-]+)+))(\.[a-zA-Z]{2,3}|(\.\w{2,3})+)(\]?)$/))
			return res.status(400).json({
				message: 'Please enter a valid email address for username.'
			});

		if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/))
			return res.status(400).json({
				message:
					'Password must contain at least 8 characters including uppercase, lowercase, special characters(#?!@$%^&*-) and number.'
			});

		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = new User({
			name,
			username,
			password: passwordHash
		});
		await newUser.save();
		res.status(200).json({ message: 'success' });
	} catch (error) {
		console.error(error);
		res.status(500).json(error.message);
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const errMsg = 'Invalid username/password.';
		const user = await User.findOne({ username });
		if (!user) return res.status(400).json({ message: errMsg });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: errMsg });

		const accesstoken = createAccessToken({ id: user._id });
		let updatedUser = await User.findOneAndUpdate(
			{ _id: user._id },
			{
				token: accesstoken
			},
			{ useFindAndModify: false, new: true }
		);
		res.status(200).json({ user: updatedUser, message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		if (!users.length) return res.status(400).json({ message: 'No users available.' });

		res.status(200).json({ users, message: 'success' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const createAccessToken = (user) => {
	return jwt.sign(user, config.get('config.ACCESS_TOKEN_SECRET'), { expiresIn: '12h' });
};
