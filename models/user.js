"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');
var moment = require('moment');


var User;

var userSchema = Schema({
	username: {type: String},
	password: {type: String}, 
	tasks: {type: Array},
	github: String,
	facebook: String
})

userSchema.methods.createJWT = function(){
	var payload = {
		sub: this._id,
		iat: moment().unix(),
		exp: moment().add(1, 'days').unix()
	};
	return jwt.encode(payload, process.env.JWT_SECRET);
}


User = mongoose.model("User", userSchema);
module.exports = User;