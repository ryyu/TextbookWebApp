var mysql  = require('mysql');
var db = require('./db_connection.js');

// database config
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM student;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });

};

/*
 create or replace view student_courses as
 SELECT s.*, c.* FROM student s
 JOIN student_course sc ON sc.student_id = s.student_id
 JOIN course c ON c.course_id = sc.course_id;

 DROP Procedure if exists student_getCourses;

 DELIMITER //
 CREATE PROCEDURE student_getCourses (_student_id varchar(255))
 BEGIN

 SELECT * FROM student_courses WHERE student_id = _student_id;

 END //
 DELIMITER ; 

 # Call the Stored Procedure
 CALL student_getCourses (?);

 */

exports.getById = function(student_id, callback)
{
    var query = 'SELECT * FROM student_courses WHERE student_id = ?';
    var queryData = [student_id];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO student (email, first_name, last_name, id_number) VALUES (?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.email, params.first_name, params.last_name, params.id_number, params.course_id];

    connection.query(query, queryData, function (err, result) {
        console.log(result);
        var student_id = result.insertId;

        var query = 'INSERT INTO student_course (student_id, course_id) VALUES ?';

        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?ARRAY OF THE VALUES
        var studentCourseData = [];
        // if only one value is submitted, JavaScript will treat the value as an array, so we skip it if its not an array
        // for example if the value of params.address_id was "10", it would loop over the "1" and then the "0", instead of
        // treating it as one value.
        if (params.course_id instanceof Array) {
            for (var i = 0; i < params.course_id.length; i++) {
                studentCourseData.push([student_id, params.course_id[i]]);
            }
        }

        // TO BULK INSERT AN ARRAY OF VALUES WE CREATE A MULTIDIMENSIONAL
        else {
            studentCourseData.push([student_id, params.course_id]);
        }
        connection.query(query, [studentCourseData], function (err, result) {
            callback(err, result);
        });
    });
};

exports.deleteCourse = function(params, callback) {
    var query = 'DELETE FROM student_course WHERE student_id = ? and course_id = ?';
    var queryData = [params.student_id, params.course_id];
    
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};