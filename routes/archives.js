"use strict";

var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Todo = require('../models/todo');

router.post("/add", function(req, res){
	var user = req.body.user_id;
	var item_id = req.body._id;
	console.log("adding to archives", req.body);
	//Archive.create(newArchive, function(err, createdArchive){
		// if(err) {
		// 	return res.status(400).send(err.message)
		// } else {
		// 	console.log("CREATED ARCHIVE", createdArchive._id, "for User:", user)
		User.findById(user, function(err, foundUser){
			if (err || !foundUser) res.status(400).send(err);
			console.log("foundUser", foundUser)
			// update tasks array and archives 
			// need if else here for appointment
			userArchives.push(createdArchive._id);
			var updatedTodos = [];
			foundUser.todos.forEach(function(item){
				if (deleteMe != item){
					updatedTodos.push(item);
				}
			})
			console.log("FOUND USER UPDATED TODOS", updatedTodos)
			foundUser.archives = userArchives;
			foundUser.todos = updatedTodos;			
			foundUser.save(function(err, updatedUser){
				if(err)res.status(400).send(err.message);
				console.log("FOUND USER TO ADD ARCHIVE AND REMOVE TASK", updatedUser.todos, updatedUser.archives)
						if(newArchive.category === 'todo'){
				Todo.findByIdAndRemove(deleteMe, function(err, updatedTodos){
				res.status(err ? 400 : 200).send(err || "updated todos")
					//if(err)res.status(400).send(err.message);
					})
				} else if (newArchive.category === 'appointment'){
					Appointment.findByIdAndDelete(deleteMe, function(err, updatedAppointments){
				res.status(err ? 400 : 200).send(err || "updated appointments")
					//if(err)res.status(400).send(err.message);
					}) 
				} // elseif appointment
				
			}) // save updates to user

		}) // find user

	// 	}
		
	
	// })//create new Archive Item

}) // add new archive


router.get("/unarchive", function(req, res){
	var user = req.body.user_id;
	var task = req.body.taskId;
	console.log("unarchiving:", task)
})

router.post("/delete", function(req, res){
	var user = req.body.user_id;
	var task = req.body.taskId;
	console.log("unarchiving:", task)
})


module.exports = router; 