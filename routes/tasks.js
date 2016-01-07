"use strict";

var express = require('express');
var router = express.Router();

var Task = require('../models/task');

router.post("/", function(req, res){
	console.log("req.body from TASK router post", req.body)
})

router.get("/", function(req, res){
	console.log("req.body from TASK router get", req);
	res.render("index")
})

module.exports = router; 