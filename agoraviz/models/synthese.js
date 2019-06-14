const ObjectId = require('mongodb').ObjectID;

// Get all syntheses of a given debate
exports.alldebate = (db, debate, cb) => {
  const debateId = debate;
  db.get('synthesecollection').find({
    debate: ObjectId(debateId),
  }, {}, (err, docs) => {
    return err ?
      cb(err)
      : cb(null, docs);
  });
};


// Get all syntheses 
exports.all = (db, cb) => {
  db.get('synthesecollection').find({}, {}, (err, docs) => {
    if (err) return cb(err);
    return cb(null, docs);
  });
};




// Get one synthese
exports.one = (db, id, cb) => {
  db.get('synthesecollection').findOne({
    _id: id,
  }, {}, (err, doc) => {
    return err ?
      cb(err)
      : cb(null, doc);
  });
};


// Create a new synthese
exports.new = (db, obj, cb) => {


  db.get('synthesecollection').insert({
    description: obj.description,
    contributions: obj.contributions,
    debate: ObjectId(obj.debate),
    auteur: obj.auteur,
    timestamp: obj.timestamp,
  }, {}, (err, doc) => {


db.get('contribcollection').find({}).each(function (contrib) {
    var synthese = db.get('synthesecollection').find({ description : obj.description});
    if (obj.contributions.includes(JSON.stringify(contrib.name))) {
        console.log(synthese._id);
        db.get('contribcollection').update({ _id: contrib._id},{$set: {synthese: obj.description}});
    }},{}, (err, doc) => {
    return err ?
      cb(err)
      : cb(null, doc);
  });

    return err ?
      cb(err)
      : cb(null, doc);
  });

  
};


// Delete a synthese
exports.delete = (db, id, cb) => {
  db.get('synthesecollection').remove({
    _id: id,
  }, {}, (err) => {
    return err ?
      cb(err)
      : cb(null);
  });
};
