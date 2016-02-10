"use strict";

var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Todo = require('../models/todo');
var Appointment = require('../models/appointment')
var Contact = require('../models/contact');

router.post("/newcontact", function(req, res){
	var userId = req.body.user_id;
	var contact = new Contact(req.body)
	console.log("IN CONTACT", contact);
	contact.save((err, savedContact) => {
		console.log("savedContact", savedContact);
		if (err)res.status(400).send(err);
		var contactId = savedContact._id;
		User.findByIdAndUpdate(userId, {$push: {contacts: contactId}} ,function(err, foundUser){
			if (err) res.status(400).send(err.message);
			console.log("FOUND USER Contacts!!!!!!!!", foundUser.contacts)
			console.log("FOUND USER:", foundUser, "TASK ID", contactId)
		res.status(err ? 400 : 200).send(err || contactId)
		})
	})
})

router.post("/delete", function(req, res){
	console.log("delete req body !!!!!!",req.body.contactId)
		Todo.findByIdAndRemove(req.body.taskId, function (err, task ){
    res.status(err ? 400 : 200).send(err || "task deleted!!");
  
	})
})

// router.put("/edit", (req, res) =>{
// 	console.log("EDIT REQ BODY !!!!!", req.body)
// 	var task = req.body;
// 	Todo.findByIdAndUpdate(task.taskId, {
// 		$set:{ task_name: task.task_name ,
// 		task_description: task.task_description, 
// 		frequency: task.frequency,
// 		 completeBy: task.completeBy, 
// 		 email_reminder: task.email_reminder, 
// 		 additional_info: task.additional_info, 
// 		 completed: task.completed } 
// 	},function(err, task){
// 		console.log("TASK IN EDIT", task)
// 		res.status(err ? 400 : 200).send(err || `task ${task} edited`);
// 	})
// })

// router.get("/", function(req, res){
// 	console.log("req.body from TASK router get", req);
// 	res.render("index")
// })

module.exports = router; 