var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	metaData: {
		title: String,
		author: String,
		organisation: String
	},
	body: String,
	addedBy: {
		uid: mongoose.Schema.Types.ObjectId
	},
	addedOn: {
		type: Date,
	 	default: Date.now
	},
	hidden: Boolean
});

// {
// 	"metaData": {
// 		"title": "blog post 3",
// 		"img": "img url",
// 		"author": "author ka naam",
// 		"organisation": "organisation"
// 	},
// 	"body": "bohot saara maal daal do uaha",
// 	"addedBy": {
// 		"uid": "5df27d01f1ad673a84eadf01"
// 	},
// 	"hidden": true
// }

module.exports = mongoose.model("Blog", blogSchema);