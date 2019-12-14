const express = require('express');
const Core = require('../utils/core');
const User = require('../models/users');
const Blog = require('../models/blogPost');
const Event = require('../models/events');
const Resource = require('../models/resources');

const createResponse = require('../helper/helper');

const router = express.Router({mergeParams: true});
const [getStatic, getAll, getID] = Core(User);
const [blogGetStatic, blogGetAll, blogGetID, blogCreate, blogUpdateID, blogDeleteID] = Core(Blog);
const [eventGetStatic, eventGetAll, eventGetID, eventCreate, eventUpdateID, eventDeleteID] = Core(Event);
const [resourceGetStatic, resourceGetAll, resourceGetID, resourceCreate, resourceUpdateID, resourceDeleteID] = Core(Resource);

function userDetails(req, res) {
	res.status(200).json(createResponse(true, 'User loaded successfully', req.user));
}

router.get('/', userDetails);

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
router.post('/resources', resourceCreate);
router.post('/resources/:id', resourceUpdateID);
router.delete('/resources/:id', resourceDeleteID);

module.exports = router;