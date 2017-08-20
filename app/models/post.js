var mongoose = require('mongoose');

module.exports = function() {
	var schema = mongoose.Schema({
		title: {
			type: String,
			required: [true, 'The field title is required']
		},
		text: {
			type: String,
			required: [true, 'The field text is required']
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Please inform the author']
		},
		status: {
			type: String,
			enum: ['draft', 'publish'],
			required: [true, 'Please inform the status of the post']
		},
		created_at: {
			type: Date,
			default: Date.now
		},
		updated_at: {
			type: Date,
			default: Date.now
		}
	});

	return mongoose.model('Post', schema);
};