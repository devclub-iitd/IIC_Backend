const express = require('express');
const Core = require('../utils/core');
const Event = require('../models/events');

const router = express.Router({mergeParams: true});
const [getStatic, getAll, getID] = Core(Event, 'metaData');

router.get('/', getAll);
router.get('/:id', getID);

module.exports = router;