"use strict";

var express = require('express');
var router = express.Router();
var Contact = require("../models/contact");
//var Tool = require("../models/tool");
var User = require('../models/user');
var Todo = require("../models/todo");

router.post("/", function(req, res){
	console.log("req.body from user router post", req.body)
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


//add to tools
router.post("/addTool", function(req, res){
	//User.findByIdAndUpdate()
	console.log("NEW FLASH CARD or SOC MEDIA", req.body);
})


router.post("/delete", function(req, res){
	console.log("REMOVING Social Media", req.body);
})

module.exports = router; 