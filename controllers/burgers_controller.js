//setting up the express and router functionalities
const express = require("express");

const router = express.Router();
//importing in the file from the models folder
let burger = require("../models/burger.js");

//router functions and logic
router.get("/", function(req, res) {
    
    //the selectAll matches the code in the ORM file
    burger.selectAll(function(data) {
      let hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  //this will write the new burger to the database
  router.post("/api/burgers", function(req, res) {
    burger.insertOne([
      "name"
    ], [
      req.body.name
    ], function(result) {
      
      res.json({ id: result.insertId });
    });
  });

  //this is to update the burger
  router.put("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  //this is to change the status of the burger from not eaten to eaten

    burger.updateOne({
      name: req.body.name
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  router.delete("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;
  
    burger.deleteOne(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
//exporting for use
  module.exports = router;