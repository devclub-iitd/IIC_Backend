const express = require('express');
const Core = require('../utils/core');
const Resource = require('../models/resources');

const router = express.Router({mergeParams: true});
const [getStatic, getAll, getID] = Core(Resource);

router.get('/', getAll);

module.exports = router;