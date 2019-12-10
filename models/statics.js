var mongoose = require('mongoose');

var staticSchema = new mongoose.Schema({
	title: String,
	body: {
		// add field acc to various static requirements
	}
});

module.exports = mongoose.model("Static", staticSchema);