"use strict";

var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Todo = require('../models/todo');
//var Task = require('../models/appointment');

router.post("/newtodo", function(req, res){
	var userId = req.body.user_id
	var todo = new Todo(req.body)
	console.log(todo)
	todo.save((err, savedTask) => {
		console.log("savedTask", savedTask)
		if (err)res.status(400).send(err.message);
		var taskId = savedTask._id;
		User.findByIdAndUpdate(userId, {$push: {todos: taskId}} ,function(err, foundUser){
			if (err) res.status(400).send(err.message);
			console.log("FOUND USER TODOS!!!!!!!!", foundUser.todos)
			console.log("FOUND USER:", foundUser, "TASK ID", taskId)
		res.status(err ? 400 : 200).send(err || "task Added")
		})
	})
})

router.post("/delete", function(req, res){
	console.log("delete req body !!!!!!",req.body.taskId)
		Todo.findByIdAndRemove(req.body.taskId, function (err, task ){
    res.status(err ? 400 : 200).send(err || "task deleted!!");
  
	})
})

router.put("/edit", (req, res) =>{
	console.log("EDIT REQ BODY !!!!!", req.body.taskId)
	var task = req.body;
	Todo.findByIdAndUpdate(req.body.taskId, {
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