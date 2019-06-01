const express = require('express');

const router = express.Router();

router.use('/debates', require('./debate'));

module.exports = router;
