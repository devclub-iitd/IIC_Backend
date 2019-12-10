var mongoose = require('mongoose');

var resourceSchema = new mongoose.Schema({
	name: String,
	body: String,
	type: {type: String, enum: ['type1', 'type2', 'type3']},
	url: String,
	provider: String, // name of the organisation providing this resource
	hidden: Boolean
});

module.exports = mongoose.model("Resource", resourceSchema);
