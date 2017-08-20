module.exports = function(app) {
	var PostModel = app.models.post;

	return {
		getAll: function(req, res) {
			PostModel.find(function(err, posts) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}

				res.status(200).json(posts);
			});
		},
		getByID: function(req, res) {
			PostModel.findById(req.params.id, function(err, post) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}

				if (!post) {
					res.status(404).json('No post found with this id');
				} else {
					res.status(200).json(post);
				}
			});
		},
		update: function(req, res) {
			var logged_id = req.decoded._doc._id;
			var params = {
				title: req.body.title,
				text: req.body.text,
				author: req.body.author,
				status: req.body.status,
				updated_at: new Date()
			};

			PostModel.findByIdAndUpdate(req.body.id, params, function(err, post) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}

				param._id = req.body.id;

				res.status(200).json(params);
			});
		},
		create: function(req, res) {
			var params = {
				title: req.body.title,
				text: req.body.text,
				author: req.body.author,
				status: req.body.status
			};

			PostModel.create(params, function(err, post) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}

				res.status(200).json(post);
			});
		},
		remove: function(req, res) {
			var logged_id = req.decoded._doc._id;

			PostModel.remove({'_id': req.params.id}, function(err) {
				if (err) {
					console.log(err);

					res.status(500).end();
				}
				
				res.status(204).end();
			});
		}
	};
};