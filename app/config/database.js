var mongoose = require('mongoose');

module.exports = function(uri) {
	mongoose.connect(process.env.MONGODB_URI || uri);

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Connected on' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! Disconnected from ' + uri);
	});

	mongoose.connection.on('error', function(error) {
		console.log('Mongoose! Error on connection: ' + error);
	});
}