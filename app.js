'use strict';

angular.module("myApp", ["ui.router", "firebase", "ngStorage", "ngAnimate"])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("home");

	$stateProvider
	.state("home", {url: "/home", templateUrl:"templates/home.html" , controller:"homeCtrl"})
	.state("register", {url:"/register", templateUrl:"templates/register.html", controller:"registerCtrl"})
	
	.state("main", {url:"/main", templateUrl:"templates/main.html", controller: "mainCtrl"})
	.state("main.edit", {url:"/edit", templateUrl:"templates/edit.html", controller:"editCtrl"})
	.state("main.add", {url:"/add", templateUrl:"templates/add.html", controller:"addCtrl"})

	.state("sample", {url: "/sample", templateUrl:"sample.html", controller:"sampleCtrl"})
	
})
