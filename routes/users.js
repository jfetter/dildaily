"use strict";

var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post("/", function(req, res){
	console.log("req.body from user router post", req.body)
})

router.get("/", function(req, res){
	console.log("req.body from user router get", req)
})

module.exports = router; 