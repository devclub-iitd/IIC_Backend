const helmet = require("helmet");
const compression = require("compression");  // compresses requests
const bodyParser = require("body-parser");
const lusca = require("lusca");
const cors = require("cors");
const mongoose = require("mongoose");

const static = require("./models/statics");

// import path from "path";
const express = require('express');
const app = express();

// mongoose.connect('mongodb://localhost:27017/iic', { useNewUrlParser: true });

app.use(compression());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.get('/', function(req, res) {
  res.send("You've reached the default start page");
});

app.get('/hello', function(req, res) {
	console.log("API call received")
	return res.status(200).json({
        'error': false,
        'data': [{"name": "test", "email": "a@g.com", "num": "123"}, {"name": "test2", "email": "b@g.com", "num": "456"}, {"name": "test3", "email": "c@g.com", "num": "789"}]
    });
	// res.send("hey!!");
});


// to test the functioning of the database and schema -

// app.get('/insertData/:data', function(req, res) {
// 	var data = req.params.data;
// 	static.create({
// 		title: "sample data",
// 		body: data,
// 	}, function(err, static) {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log("your data has been saved");
// 			res.send(data + "has been saved to the database");
// 		}
// 	})
// });

app.listen(3000, process.env.IP, function() {
	console.log("Server started");
});
