var express = require('express');
var router = express.Router();
var course_dal = require('../model/course_dal');
//var vendor_dal = require('../model/vendor_dal');


// View All courses
router.get('/all', function(req, res) {
    course_dal.getAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.render('course/courseViewAll', { 'result':result });
        }
    });
});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.course_id == null) {
        res.send('course_id is null');
    }
    else {
        course_dal.getById(req.query.course_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('course/courseViewById', {'result': result});
            }
    });
    }
});

module.exports = router;
