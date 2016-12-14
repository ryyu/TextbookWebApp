var express = require('express');
var router = express.Router();
var student_dal = require('../model/student_dal');
var course_dal = require('../model/course_dal');

// View All Students
router.get('/all', function (req, res)
{
    student_dal.getAll(function (err,result)
    {
        if(err)
        {
            res.send(err);
        }

        else
        {
            res.render('student/studentViewAll', {'result':result});
        }
    });
});

// View the student for the given id
router.get('/', function(req, res)
{
    if(req.query.student_id == null)
    {
        res.send('student_id is null');
    }
    else
    {
        student_dal.getById(req.query.student_id, function(err,result) {
            if (err)
            {
                res.send(err);
            }
            else
            {
                res.render('student/studentViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    student_dal.getAll(function(err,result) {
        course_dal.getAll(function(err,course) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('student/studentAdd', {'student': result,
                                              'course': course});

        }
        });
    });
});

// insert a student record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.email == null) {
        res.send('Student Email must be provided.');
    }
    else if(req.query.first_name == null) {
        res.send('A First Name must be selected');
    }
    else if(req.query.last_name == null) {
        res.send('A Last Name must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        student_dal.insert(req.query, function(err,result) {
                if (err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/student/all');
                }
            });
    }
});

// Delete a account for the given account_id
router.get('/delete', function(req, res){
    if(req.query.course_id == null) {
        res.send('course_id is null');
    }
    else {
        student_dal.deleteCourse(req.query, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/student/?student_id=' + req.query.student_id);
            }
        });
    }
});

module.exports = router;