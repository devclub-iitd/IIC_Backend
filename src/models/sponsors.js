var mongoose = require('mongoose');

var sponsorSchema = new mongoose.Schema({
	name: String,
	img: String,
	desc: String,
	hidden: Boolean
});


module.exports = mongoose.model("Sponsor", sponsorSchema);