var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("styles"));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Salmon Creek", image: "https://www.oregonhikers.org/w/images/e/ec/Mt._Hood%2C_Salmon_Creek_Greenway.jpg"},
  {name: "Pirkkolan Leirialue", image: "https://mw2.google.com/mw-panoramio/photos/medium/2652538.jpg"},
  {name: "Virojoen Kirkonkylä", image: "http://3bv8x43y68hc448rg43goku7yq-wpengine.netdna-ssl.com/media/2012/01/Virojoki-Road_06-990x659.jpg"}
];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {


  res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(3000, process.env.IP, function() {
  console.log("The YelpCamp server has started.")
});
