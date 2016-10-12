
var express = require('express');
var app = express();


var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


// set the view engine
app.set("view engine" , "ejs");

app.use("/" , function(req, res){

	res.render("index" , {api: process.env.API_URL || "192.10.10.150"});

});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.listen(port, function() {
  console.log('> Server up and listening on port ' + port);
});

module.exports = app;
