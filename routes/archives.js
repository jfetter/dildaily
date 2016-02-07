"use strict";

var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Todo = require('../models/todo');
var Archive = require('../models/archive')

// route.get("/archives/fetch", function(req, res){
// 	var user = req.body;
// 	console.log("fetching all archives for", user)
// })

// archives ///

router.post("/add", function(req, res){
	var user = req.body.user_id;
	var task = req.body.taskId;
	console.log("adding to archives", req.body)
})

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