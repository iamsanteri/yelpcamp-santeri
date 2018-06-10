var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var User = require("./models/user");
var Comment = require("./models/comment");
var LocalStrategy = require("passport-local");
var passport = require("passport");
var seedDB = require("./seeds");
var methodOverride = require("method-override");

// Requiring routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("styles"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// seedDB(); // Seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Santeri is the best developer!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments/", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, process.env.IP, function() {
  console.log("The YelpCamp server has started.")
});
