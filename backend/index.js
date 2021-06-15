const app = require('./server');
const mongoose = require('mongoose');
const config = require('config');

const port = config.get('config.port') || process.env.PORT || 3001;
const connectionUri = config.get('config.mongodb.connectionUri');

mongoose
	.connect(connectionUri, {
		poolSize: 50,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	})
	.then((client) => {
		app.listen(port, () => {
			console.log(`RESTful API server listening on port:${port}`);
		});
	});
