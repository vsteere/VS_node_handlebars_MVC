const connection = require("../config/connection.js");


//helper functions from a previous activity

function printQuestionMarks(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}


function objToSql(ob) {
    let arr = [];
    for (let key in ob) {
        let value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
};
//three methods for running the application
let orm = {
    //selects all burgers from database
    selectAll: function (input, cb) {
        let query = "SELECT * FROM " + input + ";";
        connection.query(query, function (err, res) {
            if (err) { throw err; }
            cb(res);
        });
    },
    //adds a new burger to database
    insertOne: function (table, cols, vals, cb) {
        let query = "INSERT INTO " + table;

        query += " (";
        query += cols.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(vals.length);
        query += ") ";

        console.log(query);

        connection.query(query, vals, function (err, res) {
            if (err) {
                throw err;
            }

            cb(res);
        });
    },

    updateOne: function(table, objColVals, condition, cb) {
        let query = "UPDATE " + table;
    
        query += " SET ";
        query += objToSql(objColVals);
        query += " WHERE ";
        query += condition;
    
        console.log(query);
        connection.query(query, function(err, res) {
          if (err) {
            throw err;
          }
    
          cb(res);
        });
      },

      deleteOne: function(table, condition, cb) {
        var query = "DELETE FROM " + table;
        query += " WHERE ";
        query += condition;
    
        connection.query(query, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
      
    

};
//exporting this out
module.exports = orm;
