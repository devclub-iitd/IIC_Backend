var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	metaData: {
		// possibleField:-
		type: {type: String, enum: ['type1', 'type2', 'type3']},
		title: String,
		eventDate: String,
		organiser: String,
		venue: String,
		img: String
	},
	body: String,
	onGoing: Boolean,
	addedBy: {
		uid: mongoose.Schema.Types.ObjectId
	},
	addedOn: {
		type: Date,
	 	default: Date.now
	},
	hidden: Boolean
});


// "metaData": {
// 		// possibleField:-
// 		"type": "type1",
// 		"title": "test event 1",
// 		"eventDate": "10-10-2019",
// 		"organiser": "organiser",
// 		"venue": "venue",
// 		"img": "imgUrl",
// 	},
// 	"body": "insert body here",
// 	"onGoing": true,
// 	"addedBy": {
// 		"uid": "5df27d01f1ad673a84eadf01"
// 	},
// 	"hidden": false,


module.exports = mongoose.model("Event", eventSchema);