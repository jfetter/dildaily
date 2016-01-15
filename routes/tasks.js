"use strict";

var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Todo = require('../models/todo');
//var Task = require('../models/appointment');

router.post("/newtodo", function(req, res){
	var userId = req.body.user_id
	var todo = new Todo(req.body)
	todo.save((err, savedTask) => {
		if (err)res.status(400).send(err.message);
		var taskId = savedTask._id
	console.log("USER ID", userId)
//find the user and add the id
// of the todo to their todo 	
		User.findByIdAndUpdate(userId, {$push: {todos: taskId}} ,function(err, foundUser){
			if (err) res.status(400).send(err.message);
			// foundUser.todos.push(taskId);
			console.log("FOUND USER TODOS!!!!!!!!", foundUser.todos)
			console.log("FOUND USER:", foundUser, "TASK ID", taskId)
		res.status(err ? 400 : 200).send(err || "task Added")
		})
})
})


router.get("/", function(req, res){
	console.log("req.body from TASK router get", req);
	res.render("index")
})

module.exports = router; 