"use strict";

var PORT = process.env.PORT || 3000;
var MONGO_URL = process.env.MONGLAB_URI || 'mongodb://localhost/dildaily';

var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var mongoose = require("mongoose");
mongoose.connect(MONGO_URL, function(err){
	if(err) return console.log(err);
	console.log("MongoDB connected to ${MONGO_URL");
});

var app = express();

app.set("view engine", "ejs");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use("/", require('./routes/index'));
app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"))
app.use("/auth", require("./routes/auth"));

app.use(function(req, res){
	res.status(404).render('404')
})

app.listen(PORT, function(){
	console.log("Listening on port", PORT);
})