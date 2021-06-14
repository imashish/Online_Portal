const express = require('express');
const path = require('path');
const userRoutes = require('./api/routes/userRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const itemRoutes = require('./api/routes/itemRoutes');
const orderRoutes = require('./api/routes/orderRoutes');

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/order', orderRoutes);

if (process.env.NODE_ENV === 'prod') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
	});
} else {
	app.get('*', (req, res) => {
		res.json({ message: 'API is up...' });
	});
}

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
});

module.exports = app;
