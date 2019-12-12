var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	metaData: {
		title: String,
		img: String,
		author: String,
		organisation: String,
	},
	body: String,
	addedBy: {
		uid: mongoose.Schema.Types.ObjectId,
	},
	addedOn: {
		type: Date,
	 	default: Date.now
	},
	hidden: Boolean,
});

module.exports = mongoose.model("Blog", blogSchema);