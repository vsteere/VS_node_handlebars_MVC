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

selectAll: function(input, cb) {
    let query = "SELECT * FROM " + input + ";";
    connection.query(query, function(err, res) {
        if (err) {throw err;}
        cb(res);
      });
},

insertOne: function(table, cols, vals, cb) {
    let query = "INSERT INTO " + table;

    query += " (";
    query += cols.toString();
    query += ") ";
    query += "VALUES (";
    query += printQuestionMarks(vals.length);
    query += ") ";

    console.log(query);

    connection.query(query, vals, function(err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },

updateOne: function() {


}

};
//exporting this out
module.exports = orm;
