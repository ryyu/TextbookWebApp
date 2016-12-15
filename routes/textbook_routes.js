var express = require('express');
var router = express.Router();
var textbook_dal = require('../model/textbook_dal');
var vendor_dal = require('../model/vendor_dal');

router.get('/all', function(req, res) {
    textbook_dal.getAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.render('textbook/textbookViewAll', { 'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.textbook_id == null) {
        res.send('textbook_id is null');
    }
    else {
        textbook_dal.getById(req.query.textbook_id, function(err,result) {
            vendor_dal.getPrices(req.query.textbook_id, function(err,vendor) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('textbook/textbookViewById', {'result': result,
                                                         'vendor':vendor});
            }
        });
    });
    }
});

module.exports = router;
