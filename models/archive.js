"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Archive;

var archiveSchema = Schema({
	user_id: {type: String, required: true},
	task_name: {type: String, required: true, default: " "}, 
	task_description: {type: String, required: true, default: " "},
	frequency: {type: String, required: true, default: " "},
	email_reminder: {type: String, required: true, default: " "},
	additional_info: {type: String, required: true, default: " "},
	completed: {type: Date},
	task_type: {type: String, required: true, default: "todo"}
})

Archive = mongoose.model("Archive", archiveSchema);
module.exports = Archive;
