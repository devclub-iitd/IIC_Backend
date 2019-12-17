var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
	name: String,
	position: String,
	organisation: String,
	username: {
		type: String,
		index: {
			unique: true
		}
	},
	password: String,
	access: {type: String, enum: ['superadmin', 'adminIIC', 'adminEDC']}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);