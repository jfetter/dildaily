"use strict";

var express = require('express');
var router = express.Router();
var Contact = require("../models/contact");
//var Tool = require("../models/tool");
var User = require('../models/user');
var Todo = require("../models/todo");

//add to tools
router.post("/tools/update", function(req, res){
	console.log(req.body)
	var userId = req.body.userId;
	var toolType = req.body.toolType;
	var newArray = req.body.array;
	if (toolType === "flash_cards"){
		console.log(`NEW ${toolType} : ${newArray} for ${userId}`);
		User.findByIdAndUpdate(userId, {$set: {flash_cards: newArray}}, function(err, modifiedUser){
			if ( err || !modifiedUser) return res.status(400).send(err)
			modifiedUser.password = null;
			console.log("USER AFTER UPDATE", modifiedUser)
			res.status(200).send(modifiedUser);
		})	
	}else if (toolType === "social_media")	{
		console.log(`NEW ${toolType} : ${newArray} for ${userId}`);
		User.findByIdAndUpdate(userId, {$set: {flash_cards: newArray}}, function(err, modifiedUser){
			if ( err || !modifiedUser) return res.status(400).send(err)
			modifiedUser.password = null;
			console.log("USER AFTER UPDATE", modifiedUser)
			res.status(200).send(modifiedUser);
		})	
	}
})

///LOGIN///
router.get("/login/:id", (req, res) => {
	let id = req.params.id;
	User.findById( id, (err, foundUser) =>{
		if ( err || !foundUser) return res.status(400).send(err)
		foundUser.password = null;
		res.status(200).send(foundUser);
	}).populate("todos contacts");
})





module.exports = router; 