module.exports = function(app) {
	var hashPassword = require('password-hash');
	var UsersModel = app.models.user;

	return {
		getAll: function(req, res) {
			UsersModel.find({}, function(err, users) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}

				var removedPassword = [];
				
				for (var i = 0; i < users.length; i++) {
					users[i]['password'] = undefined;

					removedPassword.push(users[i]);
				}

				res.json(removedPassword);
			});
		},
		getByID: function(req, res) {
			UsersModel.findById(req.params.id, function(err, users) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}

				if (!user) {
					res.status(404).json('User not found');
				}
				
				user.password = undefined;

				res.json(user);
			});
		},
		update: function(req, res) {
			var params = {
				name: req.body.name,
				lastname: req.body.lastname,
				updated_at: new Date()
			};

			if (req.body.password) {
				params.password = hashPassword.generate(req.body.password);
			}

			UsersModel.findByIdAndUpdate(req.body.id, params, function(err, user) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}

				if (!user) {
					res.status(404).json('User not found');
				}

				params._id = req.body.id,

				res.json(params);
			});
		},
		create: function(req, res) {
			var params = {
				name: req.body.name,
				lastname: req.body.lastname,
				email: req.body.email,
				password: hashPassword.generate(req.body.password)
			};

			UsersModel.create(params, function(err, user) {
				if (err.code == 11000) {
					res.status(500).json('This email is in use, try with a new one');
				} else if (err) {
					console.log(err);

					res.status(500).end();
				}

				user.password = undefined;
				
				res.status(200).json(user);
			});
		},
		remove: function(req, res) {
			UsersModel.remove({"_id": req.params.id}, function(err) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}
				
				res.status(204).end();
			});
		}
	};
};