var mongoose = require('mongoose');

module.exports = function() {
	var uri = process.env.MONGODB_URI || process.env.MONGOURI;

	mongoose.connect(uri);

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Connected on ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! Disconnected from ' + uri);
	});

	mongoose.connection.on('error', function(err) {
		console.log('Mongoose! Error on connection: ' + err);
	});
}