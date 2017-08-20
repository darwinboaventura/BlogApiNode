module.exports = function(app) {
	var Authentication = app.controllers.authentication;

	app.route('/authentication')
		.post(Authentication.login);
};