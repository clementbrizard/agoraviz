const express = require('express');
const Contribution = require('../models/contribution');

const router = express.Router();


// Get all contributions of a given debate
router.get('/:debateId', (req, res) => {
  const debateId = req.params.debateId;
  Contribution.all(req.db, debateId, (err, contributions) => {
    res.json(contributions);
  });
});

// Get all contributions of a given synthese
router.get('/synthese/:syntheseId', (req, res) => {
  const syntheseId = req.params.syntheseId;
  Contribution.allsynthese(req.db, syntheseId, (err, contributions) => {
    res.json(contributions);
  });
});

router.get('/:debateId/:end', (req, res) => {
	  const debateId = req.params.debateId;
	  const end = req.params.end;
	  Contribution.getByDate(req.db, debateId, end, (err, contributions) => {
	    res.json(contributions);
	  });
	});

router.get('/:debateId/stat/stat', (req, res) => {
	  const debateId = req.params.debateId;
	  const end = req.params.end;
	  Contribution.countByDay(req.db, debateId, (err, contributions) => {
	    res.json(contributions);
	  });
	}); 

module.exports = router;
