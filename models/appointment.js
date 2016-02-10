"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Appointment;

var appointmentSchema = Schema({
	// category: {type: String, required: true, default: "appointment"},
	// user_id: {type: String, required: true},
	// contact_name: {type: String, required: true, default: " "},
	// company_name: {type: String, required: true, default: " "},
	//appt_date: {type: Date, required: true},
	//appointment_time: {type: Date, required: true, default: ""},
	//contact_phn:{type: String, required: true, default: " "},
	
	//contact_email:{type: String, required: true, default: " "},
	//linkedin:{type: String, required: true, default: " "},
	
	
})

Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;