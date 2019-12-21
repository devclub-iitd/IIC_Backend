const express = require('express');
const Core = require('../utils/core');
const Showcase = require('../models/showcase');

const router = express.Router({mergeParams: true});
const [getStatic, getAll, getID] = Core(Showcase, 'metaData');

router.get('/', getAll);
router.get('/:id', getID);

module.exports = router;