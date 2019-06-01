// Get all debates
exports.all = (db, cb) => {
    db.get("debatcollection").find({},{}, (err,docs) => {
        if (err) return cb(err);
        return cb(null, docs);
    });
}

// Get one debate
exports.one = (db, id, cb) => {
    db.get("debatcollection").find({
        _id : id,
    },{}, (err,docs) => {
        if (err) return cb(err);
        return cb(null, docs[0]);
    });
}

// Create a new debate
exports.new = (db, obj, cb) => {
    db.get("debatcollection").insert({
        "question" : obj.question,
    }, {}, (err, doc) => {
        if (err) return cb(err);
        return cb(null, doc);
    });
}


