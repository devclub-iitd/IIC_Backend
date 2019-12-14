var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
	name: String,
	position: String, 
	organisation: String,
	contact: Number,
	img: String,
	url: {
		// links to social media profiles
	},
	email: String,
	bio: String,
	hidden: Boolean
});

module.exports = mongoose.model("Team", teamSchema);