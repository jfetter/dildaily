"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Task;

var taskSchema = Schema({
	username: {type: String, required: true}, 
	daily: {type: Array},
	weekly: {type: Array},
	other: {type: Array}
})

Task = mongoose.model("Task", taskSchema);
module.exports = Task;