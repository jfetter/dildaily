"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo;

var todoSchema = Schema({
	user_id: {type: String, required: true},
	task_name: {type: String, required: true, default: " "}, 
	task_description: {type: String, required: true, default: " "},
	frequency: {type: String, required: true, default: " "},
	completeBy: {type: Date},
	email_reminder: {type: String, required: true, default: " "},
	additional_info: {type: String, required: true, default: " "},
	completed: {type: Boolean, required: true, default: false},
	task_type: {type: String, required: true, default: "todo"}
})

Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
