var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view company_view as
 select s.*, a.street, a.zip_code from company s
 join address a on a.address_id = s.address_id;

 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM course';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(course_id, callback) {
    var query = 'SELECT c.*, tc.textbook_id FROM course c' +
                ' JOIN textbook_course tc ON tc.course_id = c.course_id' +
                ' WHERE tc.course_id = ?';

    var queryData = [course_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

/*
 create or replace view vendor_prices as
 SELECT vt.* , v.vendor_name FROM vendor_textbook vt
 JOIN vendor v ON v.vendor_id = vt.vendor_id;
 */

exports.getPrices = function(vendor_id, callback) {
    var query = 'SELECT * FROM vendor_prices WHERE textbook_id = ?';
    var queryData = [vendor_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO student_course (student_id, course_id) VALUES (?, ?)';
    console.log(params);
    var queryData = [params.student_id, course_id];

    connection.query(query, queryData, function (err, result) {

        callback(err, result);
    });
};