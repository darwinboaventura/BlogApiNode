var express = require('express');

module.exports = function() {
	var app = express();
	var load = require('express-load');
	var bodyParser = require('body-parser');

    app.set('port', process.env.PORT);
    app.set('superSecret', process.env.SS);

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

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