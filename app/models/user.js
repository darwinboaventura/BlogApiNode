var mongoose = require('mongoose');

module.exports = function() {
	var schema = mongoose.Schema({
		name: {
			type: String,
			required: [true, 'The field name is required']
		},
		lastname: {
			type: String,
			required: [true, 'The field lastname is required']
		},
		password: {
			type: String,
			required: [true, 'The field password is required']
		},
		email: {
			type: String,
			required: [true, 'The field email is required'],
			unique: true
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

	return mongoose.model('User', schema);
};