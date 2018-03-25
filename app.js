var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {name: "Salmon Creek", image: "https://www.oregonhikers.org/w/images/e/ec/Mt._Hood%2C_Salmon_Creek_Greenway.jpg"},
    {name: "Pirkkolan Leirialue", image: "https://mw2.google.com/mw-panoramio/photos/medium/2652538.jpg"},
    {name: "Virojoen Kirkonkylä", image: "http://3bv8x43y68hc448rg43goku7yq-wpengine.netdna-ssl.com/media/2012/01/Virojoki-Road_06-990x659.jpg"}
  ]

  res.render("campgrounds",{campgrounds:campgrounds});
});

app.listen(3000, process.env.IP, function() {
  console.log("The YelpCamp server has started.")
});
