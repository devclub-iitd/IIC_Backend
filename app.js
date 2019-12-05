const helmet = require("helmet");
const compression = require("compression");  // compresses requests
const bodyParser = require("body-parser");
const lusca = require("lusca");
const cors = require("cors");
// import path from "path";
const express = require('express');
const app = express();

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
	res.send("hey!!");
});

app.listen(3000, process.env.IP, function() {
	console.log("Server started");
});
