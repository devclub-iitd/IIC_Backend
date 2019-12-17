const express = require('express');
const Core = require('../utils/core');
const Static = require('../models/statics');
const User = require('../models/users');
const Blog = require('../models/blogPost');
const Event = require('../models/events');
const Resource = require('../models/resources');
const Showcase = require('../models/showcase');
const Team = require('../models/team');

const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

const createResponse = require('../helper/helper');

const router = express.Router({mergeParams: true});
const [staticGetStatic, staticGetAll, staticGetID, staticCreate, staticUpdateID, staticDeleteID] = Core(Static, 'all', true);
const [userGetStatic, userGetAll, userGetID, userCreate, userUpdateID, userDeleteID] = Core(User, 'all', true);
const [blogGetStatic, blogGetAll, blogGetID, blogCreate, blogUpdateID, blogDeleteID] = Core(Blog, 'all', true);
const [eventGetStatic, eventGetAll, eventGetID, eventCreate, eventUpdateID, eventDeleteID] = Core(Event, 'all', true);
const [resourceGetStatic, resourceGetAll, resourceGetID, resourceCreate, resourceUpdateID, resourceDeleteID] = Core(Resource, 'all', true);
const [showcaseGetStatic, showcaseGetAll, showcaseGetID, showcaseCreate, showcaseUpdateID, showcaseDeleteID] = Core(Showcase, 'all', true);
const [teamGetStatic, teamGetAll, teamGetID, teamCreate, teamUpdateID, teamDeleteID] = Core(Team, 'all', true);

router.use(session({
	secret: 'iic@iitdelhi',
	resave: false,
	saveUnitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function userDetails(req, res) {
	res.status(200).json(createResponse(true, 'User loaded successfully', req.user));
}
function createAdmin(req, res) {
		var admin = {
			name: req.body.name,
			position: req.body.position,
			organisation: req.body.organisation,
			username: req.body.username,
			access: req.body.access,
		};
		var password = req.body.password;
		User.register(new User(admin), password, function(err, user) {
			if(err) {
				console.log(err);
				return res.redirect('/api/admin/users');
			}
			passport.authenticate('local')(req, res, function() {
				res.status(200).json(createResponse(true, "admin created with details: ", user));
			})
		});
}
function updateAdminPassword(req, res) {
		var password = req.body.password;
		User.findById(req.params.id).then(
			function(sanitizedUser) {
		        if (sanitizedUser) {
		            sanitizedUser.setPassword(password, function() {
		                sanitizedUser.save();
		                res.status(200).json(createResponse(true, "Password Changed successfully", ""));
		            });
		        } else {
		        	//change error status
		            res.status(200).json(createResponse(false, "No such user found", ""));
		        }
		    }, function(err) {
		        console.error(err);
		    }
	    )
}

function updateStatic(req, res) {
	Static.findOneAndUpdate({ title: req.params.title }, { body: req.body }, { new: true }, function(err, result) {
		if(!err) {
			res.status(200).json(createResponse(true, "Updated successfully: ", result));
		} else {
			console.log(err);
		}
	})
}

function dispStatic(req, res) {
	const [getReqStatic] = Core(Static, req.params.title, true);
	getReqStatic(req, res);
}

function checkSU(req, res, next) {
	if(req.user.access == 'superadmin') {
		return next();
	}
	//change status
	res.status(200).json(createResponse(false, 'Whoops, you do not have this privlige, please contact the SuperAdmin', ''));
}

router.get('/', userDetails);

router.get('/users', checkSU, userGetAll);
router.get('/users/:id', checkSU, userGetID);
router.post('/users', checkSU, createAdmin);
router.post('/users/:id/password', checkSU, updateAdminPassword);
router.post('/users/:id', checkSU, userUpdateID);
router.delete('/users/:id', checkSU, userDeleteID);

router.get('/statics/:title', checkSU, dispStatic);
router.post('/statics', checkSU, staticCreate);
router.post('/statics/:title', checkSU, updateStatic);

router.get('/events', eventGetAll);
router.get('/events/:id', eventGetID);
router.post('/events', eventCreate);
router.post('/events/:id', eventUpdateID);
router.delete('/events/:id', eventDeleteID);

router.get('/blog', blogGetAll);
router.get('/blog/:id', blogGetID);
router.post('/blog', blogCreate);
router.post('/blog/:id', blogUpdateID);
router.delete('/blog/:id', blogDeleteID);

router.get('/resources', resourceGetAll);
router.get('/resources/:id', resourceGetID);
router.post('/resources', resourceCreate);
router.post('/resources/:id', resourceUpdateID);
router.delete('/resources/:id', resourceDeleteID);

router.get('/showcase', showcaseGetAll);
router.get('/showcase/:id', showcaseGetID);
router.post('/showcase', showcaseCreate);
router.post('/showcase/:id', showcaseUpdateID);
router.delete('/showcase/:id', showcaseDeleteID);

router.get('/team', teamGetAll);
router.get('/team/:id', teamGetID);
router.post('/team', teamCreate);
router.post('/team/:id', teamUpdateID);
router.delete('/team/:id', teamDeleteID);

module.exports = router;