var express = require('express');
var router = express.Router();
var comment_dal = require('../model/comment_dal');

/* GET home page. */
router.get('/about', function(req, res, next) {
    comment_dal.getAll(function (err,result)
    {
        if(err)
        {
            res.send(err);
        }

        else
        {
            res.render('about/about', { title: 'About' ,
                                        result: result});
        }
    });
});

router.get('/comment', function(req,res) {
    comment_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('about/comment', {result: result});

        }
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.comment == null) {
        res.send('A comment must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        comment_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/about/about');
            }
        });
    }
});

module.exports = router;