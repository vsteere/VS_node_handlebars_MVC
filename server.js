const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

const path = require("path");

//be able to use the files out of the public directory
app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// bring in Express Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Starts the server
app.listen(PORT, function() {
  
  console.log("Server listening on: http://localhost:" + PORT);
});
