var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM resume_account_info;';

    connection.query(query, function(err, result) 
    {
        callback(err, result);
    });
};

exports.getById = function(resume_id, callback) 
{
    var query = 'SELECT * FROM resume_view WHERE resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) 
    {
        callback(err, result);
    });
};

//This is gonna work this time
exports.insert = function(params, callback) {

    // FIRST INSERT THE COMPANY
    var query = 'INSERT INTO resume (resume_name, account_id) VALUES (?, ?)';

    var queryData = [params.resume_name, params.account_id];

    connection.query(query, queryData, function (err, result) {

        // THEN USE THE COMPANY_ID RETURNED AS insertId AND THE SELECTED ADDRESS_IDs INTO COMPANY_ADDRESS
        var resume_id = result.insertId;

        var query = 'INSERT INTO resume_skill (resume_id, skill_id) VALUES ?';

        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?ARRAY OF THE VALUES
        var resumeSkillData = [];
        // if only one value is submitted, JavaScript will treat the value as an array, so we skip it if its not an array
        // for example if the value of params.address_id was "10", it would loop over the "1" and then the "0", instead of
        // treating it as one value.
        if (params.skill_id instanceof Array) {
            for (var i = 0; i < params.skill_id.length; i++) {
                resumeSkillData.push([resume_id, params.skill_id[i]]);
            }
        }

        // TO BULK INSERT AN ARRAY OF VALUES WE CREATE A MULTIDIMENSIONAL
        else {
            resumeSkillData.push([resume_id, params.skill_id]);
        }

        // NOTE THE EXTRA [] AROUND companyAddressData
        connection.query(query, [resumeSkillData], function (err, result) {
           
            //second nest
            connection.query(query, queryData, function (err, result) {

                // THEN USE THE COMPANY_ID RETURNED AS insertId AND THE SELECTED ADDRESS_IDs INTO COMPANY_ADDRESS
                var resume_id = result.insertId;

                // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
                var query = 'INSERT INTO resume_school (resume_id, school_id) VALUES ?';

                // TO BULK INSERT AN ARRAY OF VALUES WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
                var resumeSchoolData = [];
                // if only one value is submitted, JavaScript will treat the value as an array, so we skip it if its not an array
                // for example if the value of params.address_id was "10", it would loop over the "1" and then the "0", instead of
                // treating it as one value.
                if (params.school_id instanceof Array) {
                    for (var i = 0; i < params.school_id.length; i++) {
                        resumeSchoolData.push([resume_id, params.school_id[i]]);
                    }
                }
                else {
                    resumeSchoolData.push([resume_id, params.school_id]);
                }

                // NOTE THE EXTRA [] AROUND companyAddressData
                connection.query(query, [resumeSchoolData], function (err, result) {
                    callback(err, result);
                });
            });
        });
    });
};



/*
exports.insert = function(params, callback) {
    var query = 'INSERT INTO resume (resume_name, account_id) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.resume_name, params.account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};
*/






/*
exports.insert = function(params, callback) {

    // FIRST INSERT THE resume
    var query = 'INSERT INTO resume (resume_name, account_id) VALUES (?, ?)';

    var queryData = [params.resume_name, params.account_id];

    // connection for multiple inserts
    
    connection.query(query, params.resume_name, function(err, result) {

        // THEN USE THE COMPANY_ID RETURNED AS insertId AND THE SELECTED ADDRESS_IDs INTO COMPANY_ADDRESS
        var resume_id = result.insertId;

        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
        var query = 'INSERT INTO resume_skill (resume_id, skill_id) VALUES ?';

        // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
        var resumeSkillData = [];

        if (params.account_id instanceof Array) {
            for (var i = 0; i < params.skill_id.length; i++) {
                resumeSkillData.push([resume_id, params.skill_id[i]]);
            }
        }
        else
        {
            resumeSkillData.push([resume_id, params.skill_id[i]]);
        }

        // NOTE THE EXTRA [] AROUND companyAddressData
        connection.query(query, [resumeSkillData], function(err, result){
            callback(err, result);
        });
    });




    connection.query(query, params.resume_name, function(err, result) {

        // THEN USE THE resume_ID RETURNED AS insertId AND THE SELECTED skills_IDs INTO resume_skill
        var resume_id = result.insertId;

        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
        var querySkill = 'INSERT INTO resume_skill (resume_id, skill_id) VALUES ?';

        // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
        var resumeSkillData = [];
        for(var i=0; i < params.skill_id.length; i++) {
            resumeSkillData.push([resume_id, params.skill_id[i]]);
        }

        // NOTE THE EXTRA [] AROUND resumeSkillData
        connection.query(query, [resumeSkillData], function(err, result){
            callback(err, result);
        });
    });


};


var resumeSkillInsert = function(resume_id, skillIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO resume_skill (resume_id, skill_id) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var resumeSkillData = [];
    for(var i=0; i < skillIdArray.length; i++) {
        resumeSkillData.push([resume_id, skillIdArray[i]]);
    }
    connection.query(query, [resumeSkillData], function(err, result){
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.resumeSkillInsert = resumeSkillInsert;
*/

exports.delete = function(resume_id, callback) {
    var query = 'DELETE FROM resume WHERE resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};