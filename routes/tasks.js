"use strict";

var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Todo = require('../models/todo');
// var Archive = require('../models/archive')
var Contact = require('../models/contact');

router.post("/userSetup", function(req, res){
	var userId = req.body.myId;
	var tasks = req.body.inject;
	console.log(tasks, "TASKSSSSS")
	var cards = req.body.cards;
	User.findByIdAndUpdate(userId, {$set: {flash_cards: cards}}, function(err, modifiedUser){
		if ( err || !modifiedUser) return res.status(400).send(err)
		//modifiedUser.password = null;
		console.log("USER AFTER UPDATE", modifiedUser);	
		var counter = 0;	
		tasks.forEach(function(todo){
			counter ++;
			var todo = new Todo(todo)
			todo.user_Id = userId;
			console.log(todo)
			console.log(counter);
		todo.save((err, savedTask) => {
			console.log("savedTask", savedTask)
			if (err)res.status(400).send(err);
			var taskId = savedTask._id;
			User.findByIdAndUpdate(userId, {$push: {todos: taskId}} ,function(err, foundUser){
				if (err) res.status(400).send(err.message);
				console.log("FOUND USER TODOS!!!!!!!!", foundUser.todos)
				console.log("FOUND USER:", foundUser, "TASK ID", taskId)
			})
		})
	})
	})	
})

router.post("/newtodo", function(req, res){
	var userId = req.body.user_id
	var todo = new Todo(req.body)
	console.log(todo)
	todo.save((err, savedTask) => {
		//console.log("savedTask", savedTask)
		if (err)res.status(400).send(err);
		var taskId = savedTask._id;
		User.findByIdAndUpdate(userId, {$push: {todos: taskId}} ,function(err, foundUser){
			if (err) res.status(400).send(err.message);
			console.log("FOUND USER TODOS!!!!!!!!", foundUser.todos)
			console.log("FOUND USER:", foundUser, "TASK ID", taskId)
		res.status(err ? 400 : 200).send(err || taskId)
		})
	})
})

router.put("/archive", function(req, res){
	var completion_date = Date.now();
	var taskId = req.body.taskId;
	console.log("task to archive", taskId);
	Todo.findByIdAndUpdate(taskId, {$set: {completion_date: completion_date, completed: true}
	}, function(err, updatedTask){
		res.status(err ? 400 : 200).send(err || taskId)	
	})
})

router.put("/unarchive", function(req, res){
	var completion_date = "";
	var taskId = req.body.taskId;
	console.log("task to archive", taskId);
	Todo.findByIdAndUpdate(taskId, {$set: {completion_date: completion_date, completed: false}
	}, function(err, updatedTask){
		res.status(err ? 400 : 200).send(err || taskId)	
	})
})

router.post("/delete", function(req, res){
	var userId = req.body.userId;
	var taskId = req.body.taskId;
	console.log("delete from user:", userId, "task:", taskId)
		User.findById(userId, function(err, foundUser){
			if (err || !foundUser) return res.status(400).send(err || "no user found");
			console.log("TODOS BEFORE DELETE", foundUser.todos)
			foundUser.todos.splice(foundUser.todos.indexOf(taskId),1)
			console.log("TODOS AFTER DELETE", foundUser.todos)
			foundUser.save(foundUser, function(err, updatedUser){
				if (err) return res.status(400).send(err)
					console.log("USER TASK REMOVED. OFF TO REMOVE TODO NOW...")
				Todo.findByIdAndRemove(taskId, function (err, deletedTask ){
    		res.status(err ? 400 : 200).send(err || "task deleted!!");
			})
		})
	})
})

router.put("/edit", (req, res) =>{
	console.log("EDIT REQ BODY !!!!!", req.body)
	var task = req.body;
	Todo.findByIdAndUpdate(task.taskId, {
		$set:{ task_name: task.task_name ,
		task_description: task.task_description, 
		frequency: task.frequency,
		 completeBy: task.completeBy, 
		 email_reminder: task.email_reminder, 
		 additional_info: task.additional_info, 
		 completed: task.completed } 
	},function(err, task){
		console.log("TASK IN EDIT", task)
		res.status(err ? 400 : 200).send(err || `task ${task} edited`);
	})
})

router.get("/", function(req, res){
	console.log("req.body from TASK router get", req);
	res.render("index")
})

module.exports = router; 