var express = require('express');
var router = express.Router();
var vendor_dal = require('../model/vendor_dal');

router.get('/all', function(req, res) {
    vendor_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('vendor/vendorViewAll', { 'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.vendor_id == null) {
        res.send('vendor_id is null');
    }
    else {
        vendor_dal.getById(req.query.vendor_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('vendor/vendorViewById', {'result': result});
            }
        });
    }
});

module.exports = router;
