var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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

const User = module.exports = mongoose.model("User", userSchema);

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
}

module.exports.getUserByName = function (username, callback) {
	const query = {username: username};
	User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) console.log(err);
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.comparePasswords = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if (err) {console.log(err)};
		callback(null, isMatch);
	})
}
