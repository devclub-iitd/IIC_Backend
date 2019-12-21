const express = require('express');
const Core = require('../utils/core');
const Static = require('../models/statics');

const router = express.Router();
const [getStatic] = Core(Static, 'about');

router.get('/', getStatic); 

module.exports = router;