// Get all debates
exports.all = (db, cb) => {
  db.get('debatcollection').find({}, {}, (err, docs) => {
    if (err) return cb(err);
    return cb(null, docs);
  });
};

// Get one debate
exports.one = (db, id, cb) => {
  db.get('debatcollection').findOne({
    _id: id,
  }, {}, (err, doc) => {
    return err ?
      cb(err)
      : cb(null, doc);
  });
};

// Create a new debate
exports.new = (db, obj, cb) => {
  db.get('debatcollection').insert({
    question: obj.question,
    sources: obj.sources,
    definitions: obj.definitions,
  }, {}, (err, doc) => {
    return err ?
      cb(err)
      : cb(null, doc);
  });
};

// Delete a debate
exports.delete = (db, id, cb) => {
  db.get('debatcollection').remove({
    _id: id,
  }, {}, (err) => {
    return err ?
      cb(err)
      : cb(null);
  });
};
