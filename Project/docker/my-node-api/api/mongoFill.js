var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/poker");
//mongoose.connect('mongodb://192.10.10.200:27017/poker');


var UsersSchema = new mongoose.Schema({
  username: {type : String, required: true, unique: true},
  password : {type: String, required: true},
  wallet : { type: Number, required: true}
});

mongoose.model('Users' , UsersSchema).create({
    username: "camz",
    password : "password",
    wallet : 10000
}, {
    username: "balmz",
    password : "password",
    wallet : 696969
}, {
    username: "adz",
    password : "password",
    wallet : 240
}, {
    username: "jbez",
    password : "password",
    wallet : 123123
}, {
    username: "laz",
    password : "password",
    wallet : 9341
}, {
    username: "alexz",
    password : "password",
    wallet : 8732
}, {
    username: "davidz",
    password : "password",
    wallet : 2134
}, {
    username: "ivanz",
    password : "password",
    wallet : 2093
}, {
    username: "testz",
    password : "password",
    wallet : 74
});


console.log("Test Data added");