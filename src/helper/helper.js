module.exports = function createResponse(status, message, data) {
	return({
		"status": status,
		"message": message,
		"data": data
	})
};