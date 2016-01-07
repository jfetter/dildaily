"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User;

var userSchema = Schema({
	username: {type: String, required: true},
	password: {type: String, required: true}, 
	tasks: {type: Array}
})

User = mongoose.model("User", userSchema);
module.exports = User;