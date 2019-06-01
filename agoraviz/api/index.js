const express = require('express')
    , router = express.Router()

router.use('/debates', require('./debate'))

module.exports = router
