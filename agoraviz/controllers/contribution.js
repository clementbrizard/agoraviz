const express = require('express');
const getJSON = require('get-json');
const Contribution = require('../models/contribution');

const router = express.Router();

/*
  CRUD
 */

// Create a new contribution
router.post('/', (req, res) => {


  var dateNewContrib = new Date();
  var jour = dateNewContrib.getDate();
  var mois = dateNewContrib.getMonth()+1;
  var annee = dateNewContrib.getFullYear();
  var heure = dateNewContrib.getHours();
  var minute = dateNewContrib.getMinutes();
  var seconde = dateNewContrib.getSeconds();

  var contribDateHeure =jour+'/'+mois+'/'+annee+':'+heure+'H'+minute+'min'+seconde+'s';


  const obj = {
    debate: req.body.debate,
    parent: req.body.parent,
    type: req.body.type,
    name: req.body.name,
    value: req.body.value,
    auteur: req.body.auteur,
    timestamp: contribDateHeure
  };

  Contribution.new(req.db, obj, (err) => {
    if (err) {
      res.send('Error when trying to create a contribution');
    }

    res.redirect('back');
  })

})

module.exports = router;
