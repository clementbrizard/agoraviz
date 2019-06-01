const express = require('express')
    , router = express.Router()

router.use('/debates', require('./debat'))

module.exports = router
