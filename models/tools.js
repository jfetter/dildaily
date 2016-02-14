"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tool;

var ToolSchema = Schema({
	user_id: String,
	flash_cards:{type: Array, default: []}
	social_media: {type: Array, default: []}
})

Tool = mongoose.model("Tool", toolSchema);
module.exports = Tool;