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
 'SELECT * FROM student_courses WHERE student_id = ?';
SELECT * FROM student WHERE IN (SELECT * FROM courses WHERE student_id = ?);

 */

exports.getById = function(student_id, callback)
{
    //var query = 'SELECT * FROM student_courses WHERE student_id = ?';
    var query = 'call student_getCourses(?)';
    var queryData = [student_id];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};


exports.insert = function(params, callback) {
    var query = 'INSERT INTO student (email, first_name, last_name, id_number) VALUES (?, ?, ?, ?)';
    
    var queryData = [params.email, params.first_name, params.last_name, params.id_number, params.course_id];

    connection.query(query, queryData, function (err, result) {
        console.log(result);
        var student_id = result.insertId;

        var query = 'INSERT INTO student_course (student_id, course_id) VALUES ?';
        
        var studentCourseData = [];
        
        if (params.course_id instanceof Array) {
            for (var i = 0; i < params.course_id.length; i++) {
                studentCourseData.push([student_id, params.course_id[i]]);
            }
        }
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