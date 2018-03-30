var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("styles"));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Syntetic creation of an element on startup if needed:

/*  Campground.create({
    name: "Pirkkolan Leirialue",
    image: "https://mw2.google.com/mw-panoramio/photos/medium/2652538.jpg",
    description: "This is a nice campground in Finland. Especially good for children."
  }, function(err, campground){
    if(err) {
      console.log(err);
    } else {
      console.log("Newly created campground: ");
      console.log("campground");
    }
  });
*/

app.get("/", function(req, res) {
  res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("index",{campgrounds:allCampgrounds});
    }
  });
});

// POST - create a new campground
app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  // Create a new campground and sace to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);

    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3000, process.env.IP, function() {
  console.log("The YelpCamp server has started.")
});
