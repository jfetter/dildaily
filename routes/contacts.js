"use strict";

var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Todo = require('../models/todo');
var Archive = require('../models/archive')
var Appointment = require('../models/appointment')
var Contact = require('../models/contact');

module.exports = router; 