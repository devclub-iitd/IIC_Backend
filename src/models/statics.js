var mongoose = require('mongoose');

var staticSchema = new mongoose.Schema({
	title: String,
	body: {
		about: String,
		initiatives: [{
			title: String,
			desc: String,
			img: String,
		}],
		// add field acc to various static requirements
	},
	hidden: Boolean,
});

module.exports = mongoose.model("Static", staticSchema);