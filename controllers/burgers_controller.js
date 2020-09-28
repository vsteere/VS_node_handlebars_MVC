//setting up the express and router functionalities
const express = require("express");

const router = express.Router();
//importing in the file from the models folder
let burger = require("../models/burger.js");