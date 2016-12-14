var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM comments';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    // FIRST INSERT THE course
    var query = 'INSERT INTO comments (comment) VALUES (?)';
    var queryData = [params.comment];

    connection.query(query, queryData, function (err, result) {

        callback(err, result);
    });
};