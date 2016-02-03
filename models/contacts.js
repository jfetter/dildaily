"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contacts;

var contactsSchema = Schema({
	user: {type: String},
	name: {type: String},
	email: {type: String},
	phone: {type: String},
	company: {type: String}, 
	notes: {type: String}, 
	LastSpoke: {type: Date}, 
	nextMeeting: {type: Date}, 
})

Completed = mongoose.model("Completed", completedSchema);
module.exports = Todo;