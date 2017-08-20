module.exports = function(app) {
	var Users = app.controllers.users;
	var Authentication = app.controllers.authentication;

	app.route('/users')
		.get(Users.getAll)
		.put(Authentication.isAuthenticated, Authentication.isAuthorized('user', '_id'), Users.update)
		.post(Users.create);

	app.route('/users/:id')
		.get(Authentication.isAuthenticated, Authentication.isAuthorized('user', '_id'), Users.getByID)
		.delete(Authentication.isAuthenticated, Authentication.isAuthorized('user', '_id'), Users.remove);
};