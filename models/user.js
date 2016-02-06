"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');
var moment = require('moment');


var User;

var userSchema = Schema({
	username: {type: String},
	email: {type: String, required: true, unique: true},
	password: {type: String}, 
	// link the ids saved in this array to the array of todos
	todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
	//appointments: { type: Schema.Types.ObjectId, ref: 'Appointment' },
	contacts: {type: Array},
	github: String,
	facebook: String
})

userSchema.methods.createJWT = function(){
	var payload = {
		sub: this._id,
		iat: moment().unix(),
		exp: moment().add(1, 'days').unix()
	};
	console.log("this", this)
	var token = jwt.encode(payload, process.env.JWT_SECRET);
	console.log("token", token);
	return token;
}


User = mongoose.model("User", userSchema);
module.exports = User;