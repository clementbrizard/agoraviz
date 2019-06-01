const express = require('express')
    , router = express.Router()
    , Debate = require('../models/debate')

/*
    CRUD
 */

// Create a new debate
router.post('/', (req, res) => {
    console.log(req.body);
    const obj = {
        question : req.body.question,
    };

    Debate.new(req.db, obj, (err, debate) => {
        if (err) {
            res.send("Error when trying to create a debate");
        }

        res.redirect("/");
    });
});


/*
    Get pages
 */

// Get new debate form
router.get('/new', (req, res) => {
    res.render(
        'pages/debate/newDebate',
        { title: 'Lancer un nouveau débat' }
        );
});

module.exports = router;
