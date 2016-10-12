var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var router = require('./config/routes');
var port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost/poker');
//mongoose.connect(process.env.DB_URL || 'mongodb://192.10.10.200:27017/poker');
//mongoose.connect('mongodb://localhost/poker');
//mongoose.connect('mongodb://192.10.10.200:27017/poker');
mongoose.connect(process.env.DB_URL || 'mongodb://192.10.10.200:27017/poker'); //testing prod

var User = require('./models/user');

app.use(session({
  resave:false,
  saveUninitialized: true,
  secret: 'qwerty'
}));

// method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// load current user
app.use(function (req, res, next) {
  //console.log(req.body.user);
	if (!req.body.user) {
		res.locals.user = false;
		next();
	} else {
		User.findById(req.body.user, function(err, user) {
			if (user) {
				req.user = user;
				res.locals.user = user;
			} else {
				req.body.user = null;
				delete res.locals.user;
			}
			next(err);
		});
	};
});

// // check for login on all routes except sessions
// app.use(/^\/(?!sessions|users).*/, function(req, res, next) {
//   if (!req.user) {
//     res.redirect('/sessions/new');
//   } else {
//     next();
//   }
// });


app.use('/api', router);


app.listen(port, function(){
  console.log("express app is listening on port " + port);
});
