const express = require('express')
    , router = express.Router()

router.use('/debates', require('./debat'))

router.get('/', (req, res) => {
    res.render('index', { title: 'AgoraViz' })
})

module.exports = router
