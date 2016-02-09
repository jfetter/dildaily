"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact;

var contactSchema = Schema({
	user_id: {type: String, required: true},
	contact_name: {type: String, required: true, default: " "},
	company_name: {type: String, required: true, default: " "},
	notes: {type: String, required: true, default: " "},
	contact_phn:{type: String, required: true, default: " "},
	contact_email:{type: String, required: true, default: " "},
	additional_contact_info:{type: String, required: true, default: " "},
	last_contact_date:{type: Date, required: true, default: " "},
	next_contact_date:{type: Date, required: true, default: " "}
})

Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;