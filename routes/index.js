var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('djcollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "djlist" : docs
        });
    });
});

module.exports = router;
