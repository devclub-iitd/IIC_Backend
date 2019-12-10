var mongoose = require('mongoose');

var showcaseSchema = new mongoose.Schema({
	metaData: {
		title: String,
		img: String,
		founder: [String],
    founded: Date,
    url: String,
	},
	body: String,
	addedBy: {
		uid: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	hidden: Boolean,
});

module.exports = mongoose.model("Showcase", showcaseSchema);
