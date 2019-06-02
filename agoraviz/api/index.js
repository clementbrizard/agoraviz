const express = require('express');

const router = express.Router();

router.use('/debates', require('./debate'));
router.use('/contributions', require('./contribution'));

module.exports = router;
