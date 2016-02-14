"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo;

var todoSchema = Schema({
	user_id: {type: String, required: true},
	task_name: {type: String}, 
	task_description: {type: String},
	frequency: {type: String},
	completeBy: {type: Date},
	email_reminder: {type: String},
	additional_info: {type: String},
	category: {type: String, required: true, default: "todo"},
	completed: {type: Boolean, required: true, default: false},
	completion_date: {type: Date}
})

Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
