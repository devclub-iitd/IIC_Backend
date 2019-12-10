var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	metaData: {
		// possibleField:-
		type: {type: String, enum: ['type1', 'type2', 'type3']},
		title: String,
		eventDate: Date,
		organiser: String,
		venue: String,
		img: String,
	},
	body: String,
	onGoing: Boolean,
	addedBy: {
		uid: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	addedOn: {
		type: Date,
	 	default: Date.now
	}
	hidden: Boolean,
});

module.exports = mongoose.model("Event", eventSchema);