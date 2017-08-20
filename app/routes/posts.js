module.exports = function(app) {
	var Posts = app.controllers.posts;
	var Authentication = app.controllers.authentication;

	app.route('/posts')
		.put(Authentication.isAuthenticated, Authentication.isAuthorized('post', 'author'), Posts.update)
		.post(Authentication.isAuthenticated, Posts.create);

	app.route('/posts/:id')
		.get(Posts.getByID)
		.delete(Authentication.isAuthenticated, Authentication.isAuthorized('post', 'author'), Posts.remove);
};