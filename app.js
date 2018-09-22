var express = require("express");

var app = express();

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
var request = require("request");

app.get("/" , function(req, res){
    res.render("home");
})

app.post("/search", function(req, res){
    var moviename = req.body.moviename;
   // console.log(moviename);
    request("http://www.omdbapi.com/?apikey=5d333552&s="+moviename , function(error, response, body){
        if (!error && response.statusCode == 200){
           var parseBody = JSON.parse(body);
           res.render("movieview", {parseBody : parseBody});
        }
        else {
           console.log(error);
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function (req, res){
    console.log("Server started!!");
})