"use strict";

var express = require('express');
var router = express.Router();

var User = require('../models/user');
//var Todo = require("../models/todo");
//var Appointment = require("../models/appointment");

router.post("/", function(req, res){
	console.log("req.body from user router post", req.body)
})

///LOGIN///
router.get("/login/:id", (req, res) => {
	let id = req.params.id;
	User.findById( id, (err, foundUser) =>{
		console.log("found user after login", foundUser)
		res.status(err ? 400:200).send(err || foundUser)
	})
})

///// UPDATE TASKS/// 
// router.put("/newtask", (req, res) => {
// 	var userId = req.body.userId
// 	console.log("USER ID", userId)
// //find the user and add the id
// // of the todo to their todo 
// 	User.findByIdAndUpdate( userId,function(err, foundUser){
//   if (err) res.status(400).send(err.message);
//  console.log("FOUND USER!!!!!!!!", foundUser)
//  foundUser.todos.push(taskId);
//   console.log("FOUND USER:", foundUser, "TASK ID", taskId)
//   res.status(err ? 400 : 200).send(err || "task Added")
//  }).populate("todos");
// })
module.exports = router; 