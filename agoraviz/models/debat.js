// Get all debates
exports.all = (db, cb) => {
    db.get("debatcollection").find({},{},function(err,docs){
        cb(null, docs);
    });
}


