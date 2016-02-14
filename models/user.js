"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');
var moment = require('moment');
var bcrypt = require('bcrypt');
// var Todo = require('./models/todo.js');
// var Archive = require('./models/archive.js');

var User;

var userSchema = Schema({
	username: {type: String},
	email: {type: String, required: true, unique: true},
	password: {type: String}, 
	// link the ids saved in this array to the array of todos
	todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
	appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
	contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
	flash_cards:{type: Array, default: []},
	social_media: {type: Object, default: {}},
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

userSchema.statics.register = function(user, cb){
	var email = user.email;
	var username = user.username;
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, password) {
			User.find({email: email}, function(err, user){
				if (err || user[0]){return console.log(err || "email already exists")}
				var newUser = new User;
				newUser.email = email;
				newUser.username = username;
				newUser.password = password;
				console.log(newUser)
				newUser.save(function(err, savedUser){
					savedUser.password = null;
					cb(err, savedUser)
				})
			})
		});
	});
}

userSchema.statics.login = function(user, cb){
	var email = user.email;
	var password = user.password;
	User.findOne({email: email}, function(err, dbUser){
		console.log("DB USER", dbUser)
		if(err || !dbUser) return cb(err || 'Incorrect email or password');
		bcrypt.compare(user.password, dbUser.password, function(err, correct){
			if(err) return cb(err);
			else if (!correct) return cb(false)
			dbUser.password = null;
			cb(null, dbUser);
		})
	})
}


User = mongoose.model("User", userSchema);
module.exports = User;