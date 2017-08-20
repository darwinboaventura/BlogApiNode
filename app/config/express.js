var express = require('express');

module.exports = function() {
	var app = express();
	var load = require('express-load');
	var bodyParser = require('body-parser');

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.set('port', process.env.PORT);
	app.set('superSecret', process.env.SS);

	load('models', {cwd: 'app'})
	.then('controllers')
	.then('routes')
	.into(app);

	// 404
	app.get('*', function(req, res) {
		res.status(404).json("The router don't exist");
	});

	return app;
}