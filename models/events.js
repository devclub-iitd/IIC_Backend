var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	title: String,
	tagline: String,
	body: String,
	organiser: String,
	eventDate: Date,
	addedBy: {
		uid: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	addedOn: {
		type: Date,
	 	default: Date.now
	 }
});

module.exports = mongoose.model("Event", eventSchema);