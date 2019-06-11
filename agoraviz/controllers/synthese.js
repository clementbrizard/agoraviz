const express = require('express');
const getJSON = require('get-json');
const Synthese = require('../models/synthese');

const router = express.Router();

/*
    CRUD
 */

// Create a new synthese
router.post('/', (req, res) => {

  var dateNewSynthese = new Date();
  var jour = dateNewSynthese.getDate();
  var mois = dateNewSynthese.getMonth()+1;
  var annee = dateNewSynthese.getFullYear();
  var heure = dateNewSynthese.getHours();
  var minute = dateNewSynthese.getMinutes();
  var seconde = dateNewSynthese.getSeconds();

  var syntheseDateHeure =jour+'/'+mois+'/'+annee+':'+heure+'H'+minute+'min'+seconde+'s';
  
  /*
  contribsToInsert = [];

  req.body.contributions.forEach(function (c){
    contribsToInsert.push(ObjectId(c));
  })*/

  const obj = {
    description: req.body.description,
    contributions: req.body.contributions,

    debate: req.body.debate,
    auteur: req.body.auteur,
    timestamp: syntheseDateHeure,
  };


  Synthese.new(req.db, obj, (err) => {
    if (err) {
      res.send('Error when trying to create a synthese');
    }

    res.redirect('/debates');
  });
});



// Delete a synthese
router.post('/delete/:id', (req, res) => {
  const id = req.params.id;

  Synthese.delete(req.db, id, (err) => {
    if (err) {
      res.send('Error trying to delete a synthese')
    }

    res.redirect('/debates');
  });
});



module.exports = router;
