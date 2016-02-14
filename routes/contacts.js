"use strict";

var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Todo = require('../models/todo');
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
			console.log("FOUND USER:", foundUser, "Contact ID", contactId)
		res.status(err ? 400 : 200).send(err || contactId)
		})
	})
})

router.post("/delete", function(req, res){
	var userId = req.body.userId;
	var contactId = req.body.contactId;
	var removeWhich = req.body.removeWhich;
	console.log("delete req body !!!!!!",req.body.contactId, userId, "remove: ", removeWhich)
		if (removeWhich === 'Contact' || removeWhich === "Apponitment" ){
			var changeTo =  removeWhich == "Contact" ? "Appointment" : "Contact";
			Contact.findByIdAndUpdate(contactId, { $set: {category: changeTo } } ,function(err, foundPerson){
				if (err || !foundPerson) return res.status(400).send(err || "no user found");	
				res.status(200).send("switched to only contact or only appointment")
		}) 
	} else {
			User.findById(userId, function(err, foundUser){
				if (err || !foundUser) return res.status(400).send(err || "no user found");
					console.log("CONTACTS BEFORE DELETE", foundUser.contacts)
					foundUser.contacts.splice(foundUser.contacts.indexOf(contactId),1)
					console.log("CONTACTS AFTER DELETE", foundUser.contacts)
					foundUser.save(foundUser, function(err, updatedUser){
				if (err) return res.status(400).send(err)
						Contact.findByIdAndRemove(req.body.contactId, function (err, dbcontact ){
			   		res.status(err ? 400 : 200).send(err || "contact deleted!!");
				})
			})
		})
	}
})

router.put("/edit", (req, res) =>{
	console.log("EDIT REQ BODY !!!!!", req.body)
	var contact = req.body;
	Contact.findByIdAndUpdate(contact.contactId, contact, {upsert:true},
		function(err, contact){
		if (err || !contact) return res.status(400).send(err || "no contact found")
		console.log("contact IN EDIT", contact)
		res.status( 200).send(err || `Entry: ${contact} edited`);
	})
})

// router.put("/edit", (req, res) =>{
// 	console.log("EDIT REQ BODY !!!!!", req.body)
// 	var task = req.body;
// 	Contact.findByIdAndUpdate(task.taskId, {
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

module.exports = router; 