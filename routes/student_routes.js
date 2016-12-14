var express = require('express');
var router = express.Router();
var student_dal = require('../model/student_dal');


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
        student_dal.getById(req.query.student_id, function(err,result)
        {
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
    account_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('account/accountAdd', {'account': result});
        }
    });
});

// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.email== null) {
        res.send('Account Email must be provided.');
    }
    else if(req.query.first_name == null) {
        res.send('An First Name must be selected');
    }
    else if(req.query.last_name == null) {
        res.send('An Last Name must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        account_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});

// Delete a account for the given account_id
router.get('/delete', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.delete(req.query.account_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});

module.exports = router;