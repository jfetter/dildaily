"use strict";

var express = require('express');
var router = express.Router();
//var User = require("../models/user")
//var Todo = require('../models/todo');
// var Archive = require('../models/archive')
//var Appointment = require('../models/appointment')
//var Contact = require('../models/contact');

router.post("/addNew", function(req, res){

	console.log("NEW FLASH CARD or SOC MEDIA", req.body);
})

router.post("/delete", function(req, res){
	console.log("REMOVING Social Media", req.body);
})


module.exports = router; 