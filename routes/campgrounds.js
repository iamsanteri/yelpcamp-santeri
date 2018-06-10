var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
    }
  });
});

// POST - create a new campground
router.post("/", (req, res) => {
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
router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);

    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// Middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
