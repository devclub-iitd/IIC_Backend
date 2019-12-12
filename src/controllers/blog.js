const express = require('express');
const Core = require('../utils/core');
const Blog = require('../models/blogPost');

const router = express.Router({mergeParams: true});
const [getStatic, getAll, getID] = Core(Blog, 'metaData');

router.get('/', getAll);
router.get('/:id', getID);

module.exports = router;