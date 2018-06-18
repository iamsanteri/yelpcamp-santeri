var express = require("express");
var app = express();
var flash = require("connect-flash");
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

// Setup environment variable defaults
var url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp"
var portEnv = process.env.PORT || 3000;

// mongoose.connect("mongodb://localhost/yelpcamp");
mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("styles"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments/", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("The YelpCamp server has started.")
});
