module.exports = function createResponse(message, data) {
	return({
		"message": message,
		"data": data
	})
};