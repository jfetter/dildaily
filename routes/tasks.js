"use strict";

var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Todo = require('../models/todo');
//var Task = require('../models/appointment');

router.post("/newtodo", function(req, res){
	var userId = req.body.user_id
	console.log("USER ID", userId)
	var todo = new Todo(req.body)
	todo.save((err, savedTask) => {
		if (err){
			res.send(err)
		} else {
		User.findById(userId, function(err, foundUser){
			console.log("FOUND USER:", foundUser)
//find the user and populate their tasks with the updated array
		res.status(err ? 400 : 200).send(err || "task Added")

		}).populate("todos");
	}
})
})


router.get("/", function(req, res){
	console.log("req.body from TASK router get", req);
	res.render("index")
})

module.exports = router; 