"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Appointment;

var appointmentSchema = Schema({
	user_id: {type: String, required: true},
	contact_name: {type: String, required: true, default: " "},
	company_name: {type: String, required: true, default: " "},
	descript: {type: String, required: true, default: " "},
	contact_phn:{type: String, required: true, default: " "},
	contact_email:{type: String, required: true, default: " "},
	additional_contact_info:{type: String, required: true, default: " "},
	notes: {type: String, required: true, default: " "},
	appointment_date: {type: Date},
	appointment_time: {type: Date, required: true, default: ""},
	followup_date: {type: Date}
})

Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;