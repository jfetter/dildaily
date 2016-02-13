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

// router.post("/delete", function(req, res){
// 	var userId = req.body.userId;
// 	var taskId = req.body.taskId;
// 	console.log("delete from user:", userId, "task:", taskId)
// 		User.findById(userId, function(err, foundUser){
// 			if (err || !foundUser) return res.status(400).send(err || "no user found");
// 			console.log("TODOS BEFORE DELETE", foundUser.todos)
// 			foundUser.todos.splice(foundUser.todos.indexOf(taskId),1)
// 			console.log("TODOS AFTER DELETE", foundUser.todos)
// 			foundUser.save(foundUser, function(err, updatedUser){
// 				if (err) return res.status(400).send(err)
// 					console.log("USER TASK REMOVED. OFF TO REMOVE TODO NOW...")
// 				Todo.findByIdAndRemove(taskId, function (err, deletedTask ){
//     		res.status(err ? 400 : 200).send(err || "task deleted!!");
// 			})
// 		})
// 	})
// })

router.put("/edit", (req, res) =>{
	console.log("EDIT REQ BODY !!!!!", req.body)
	var task = req.body;
	Todo.findByIdAndUpdate(task.taskId,function(err, updatedEntry){
		console.log("TASK IN EDIT", updatedEntry)
		res.status(err ? 400 : 200).send(err || `Entry: ${updatedEntry} edited`);
	})
})

// router.get("/", function(req, res){
// 	console.log("req.body from TASK router get", req);
// 	res.render("index")
// })

module.exports = router; 