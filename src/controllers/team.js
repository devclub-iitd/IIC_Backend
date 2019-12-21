const express = require('express');
const Core = require('../utils/core');
const Team = require('../models/team');

const router = express.Router({mergeParams: true});
const [getStatic, getAll, getID] = Core(Team);

router.get('/', getAll);

module.exports = router;