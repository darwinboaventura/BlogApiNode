module.exports = function(app) {
	var UserModel = app.models.user;
	var jwt = require('jsonwebtoken');
	var hashPassword = require('password-hash');

	return {
		login: function(req, res) {
			UserModel.findOne({
				email: req.body.email
			}, function(err, user) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}

				if (!user) {
					res.json({ success: false, message: 'Authentication failed. User not found.' });
				} else if (user) {
					if (!hashPassword.verify(req.body.password, user.password)) {
						res.json({ success: false, message: 'Authentication failed. Wrong password.' });
					} else {
						var token = jwt.sign(user, app.get('superSecret'));

						res.json({
							success: true,
							message: 'Enjoy your token!',
							token: token
						});
					}
				}
			});
		},
		isAuthenticated: function(req, res, next) {
			var token = req.body.token || req.query.token || req.headers['x-access-token'];

			if (token) {
				jwt.verify(token, app.get('superSecret'), function(err, decoded) {
					if (err) {
						return res.json({ success: false, message: 'Failed to authenticate token.' });
					} else {
						req.decoded = decoded;

						next();
					}
				});
			} else {
				return res.status(403).send({ 
					success: false, 
					message: 'No token provided.' 
				});
			}
		},
		isAuthorized: function(model, field) {
			return function(req, res, next) {
				var author = req.decoded._doc._id;
				var GenericModel = app.models[model];

				GenericModel.findById(req.params.id || req.body.id, function(err, document) {
					if (err) {
						console.log(err);

						res.status(500).end();
					}

					if (!document) {
						res.status(404).end();
					} else {
						if (document[field] != author) {
							res.status(401).json("You don't have permission.");
						} else {
							next();
						}
					}
				});
			}
		}
	};
};