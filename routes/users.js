"use strict";

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Todo = require("../models/todo");
//var Appointment = require("../models/appointment");

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
			console.log("found user after login", foundUser)
	}).populate("todos contacts appointments");
})




module.exports = router; 