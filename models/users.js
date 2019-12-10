var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: String,
	position: String,
	organisation: String,
	email: {
		type: String,
		index: {
			unique: true
		}
	},
	password: String,
	access: {type: String, enum: ['superadmin', 'adminIIC', 'adminEDC', 'guest']},
});

module.exports = mongoose.model("User", userSchema);