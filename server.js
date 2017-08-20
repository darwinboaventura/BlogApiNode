require('dotenv').config();

var http = require("http");
var app = require('./app/config/express')();

require('./app/config/database.js')();

http.createServer(app).listen(app.get('port'), function() {
	console.log("Server running on port " + app.get('port'));
});