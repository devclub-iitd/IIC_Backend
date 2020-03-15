var mongoose = require('mongoose');

var showcaseSchema = new mongoose.Schema({
	metaData: {
		title: String,
		founder: [String],
	    url: String
	},
	body: String,
	addedBy: {
		uid: mongoose.Schema.Types.ObjectId
	},
	hidden: Boolean
});

module.exports = mongoose.model("Showcase", showcaseSchema);
