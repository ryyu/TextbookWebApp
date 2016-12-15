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
    var query = 'SELECT * FROM textbook;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

/*
 create or replace view textbook_authors as
 SELECT a.*, t.title, t.ISBN, t.edition FROM authors a
 JOIN textbook t on a.textbook_id = t.textbook_id;
 */


exports.getById = function(textbook_id, callback) {
    var query = 'SELECT * FROM textbook_authors WHERE textbook_id = ?';
    var queryData = [textbook_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};
