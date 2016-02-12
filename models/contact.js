"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact;

var contactSchema = Schema({
	category: {type: String, required: true},
	user_id: {type: String, required: true},
	contact_method: {type: String},
	contact_name: {type: String},
	company_name: {type: String},
	next_appt_date: {type: Date},
	appointment_time: {type: Date},
	contact_phn:{type: String},
	contact_email:{type: String},
	linkedin:{type: String},
	last_contact_date: {type: Date},
	followup_date: {type: Date},
	contact_notes: {type: String},
	appt_notes: {type: String},
	recurrence: {type: String}
})



Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;