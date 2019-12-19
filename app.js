const helmet = require("helmet");
const compression = require("compression");  // compresses requests
const bodyParser = require("body-parser");
const lusca = require("lusca");
const cors = require("cors");
const mongoose = require("mongoose");

const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


const aboutRouter = require("./src/controllers/about");
const adminRouter = require("./src/controllers/admin");
const blogRouter = require("./src/controllers/blog");
const eventRouter = require("./src/controllers/events");
const initRouter = require("./src/controllers/initiatives");
const resourceRouter = require("./src/controllers/resources");
const showcaseRouter = require("./src/controllers/showcase");
const teamRouter = require("./src/controllers/team");

// import path from "path";
const express = require('express');
const app = express();
const MONGODB_URI = process.env["MONGODB_URI_LOCAL"] || "mongodb://localhost:27017/iic_backend";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
.then(function() {
	console.log("Connected to mongoDB");
}).catch(function(err) {
	console.log(err);
});

app.use(compression());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


app.use(session({
	secret: 'iic@iitdelhi',
	resave: false,
	saveUnitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
var User = require('./src/models/users');
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine","ejs");

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	console.log('user is not logged in');
}

app.get('/', function(req, res) {
  res.send("You've reached the default start page");
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/api/admin',
	failureRedirect: '/login',
}), function(req, res) {});


const apiRouter = express.Router();

apiRouter.use('/about', aboutRouter);
// apiRouter.use('/admin', adminRouter);
apiRouter.use('/admin',isLoggedIn, adminRouter);
apiRouter.use('/blog', blogRouter);
apiRouter.use('/events', eventRouter);
apiRouter.use('/initiatives', initRouter);
apiRouter.use('/resources', resourceRouter);
apiRouter.use('/showcase', showcaseRouter);
apiRouter.use('/team', teamRouter);

app.use('/api', apiRouter);


app.get('/login', function(req, res) {
	res.render('form.ejs')
})

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("Server started");
});

// app.post('/testForm', function(req, res) {
// 	console.log(req.body)
// })

// app.get('/createAdmin', function(req, res) {
// 	var admin = {
// 		name: 'Aryan',
// 		position: 'PosName',
// 		organisation: 'OrgName',
// 		username: 'aryanguptaleo@gmail.com',
// 		access: 'superadmin',
// 	};
// 	var password = 'helloworld';
// 	User.register(new User(admin), password, function(err, user) {
// 		if(err) {
// 			console.log(err);
// 			return res.redirect('/');
// 		}
// 		passport.authenticate('local')(req, res, function() {
// 			res.redirect('/admin');
// 		})
// 	});
// });


// app.get('/hello', function(req, res) {
// 	console.log("API call received")
// 	return res.status(200).json({
//         'error': false,
//         'data': [{"name": "test", "email": "a@g.com", "num": "123"}, {"name": "test2", "email": "b@g.com", "num": "456"}, {"name": "test3", "email": "c@g.com", "num": "789"}]
//     });
// });





// to test the functioning of the database and schema -

// app.get('/insertData', function(req, res) {

// 	var data = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
// 	static.create({
// 		title: "about",
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
