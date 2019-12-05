var mongoose = require('mongoose');

var staticSchema = new mongoose.Schema({
	title: String,
	body: String
});

module.exports = mongoose.model("Static", staticSchema);