var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("You've reached the default start page");
});

app.get('/hello', function(req, res) {
	res.send("hey!!");
});

app.listen(3000, process.env.IP, function() {
	console.log("Server started");
});
