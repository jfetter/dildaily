"use strict";

var express = require('express');
var router = express.Router();

var User = require('../models/user');
//var Todo = require("../models/todo");
//var Appointment = require("../models/appointment");

router.post("/", function(req, res){
	console.log("req.body from user router post", req.body)
})

router.get("/login/:id", (req, res) => {
	let id = req.params.id;
	User.findById( id, (err, foundUser) =>{
		console.log("found user after login", foundUser)
		res.status(err ? 400:200).send(err || foundUser)
	})
})

module.exports = router; 