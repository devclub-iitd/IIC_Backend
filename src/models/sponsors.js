var mongoose = require('mongoose');

var sponsorSchema = new mongoose.Schema({
	name: String,
	hidden: Boolean
});


module.exports = mongoose.model("Sponsor", sponsorSchema);