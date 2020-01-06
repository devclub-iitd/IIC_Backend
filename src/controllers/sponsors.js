const express = require('express');
const Core = require('../utils/core');
const Sponsor = require('../models/sponsors');

const router = express.Router({mergeParams: true});
const [getStatic, getAll, getID] = Core(Sponsor);

router.get('/', getAll);
router.get('/:id', getID);

module.exports = router;