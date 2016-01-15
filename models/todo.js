"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo;

var todoSchema = Schema({
	user_id: {type: String, required: true},
	todo_name: {type: String}, 
	todo_description: {type: String},
	todo_frequency: {type: String},
	todo_completeBy: {type: Date},
	task_type: {type: String},
	todo_email_reminder: {type: String},
	todo_additional_info: {type: String},
	todo_completed: {type: Boolean, required: true, default: false}
})

Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
