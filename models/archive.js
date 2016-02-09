"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Archive;

var archiveSchema = Schema({
	user_id: {type: String, required: true},
	archive_name: {type: String, required: true, default: " "}, 
	descript: {type: String, required: true, default: " "},
	additional_info: {type: String, required: true, default: " "},
	completed: {type: Date},
	category: {type: String, required: true, default: "todo"}
})

Archive = mongoose.model("Archive", archiveSchema);
module.exports = Archive;
