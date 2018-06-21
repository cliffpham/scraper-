var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");


var PORT = 4000;

// Initialize Express
var app = express();

// Configure middleware


// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scrapedArticles", {
  useMongoClient: true
});

app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: __dirname + '/views/layouts' }));
app.set("view engine", "handlebars");


require("./routes/routes.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
