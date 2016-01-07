'use strict';

//take out nganimate and ngstorage if I dont end up using them in final product
angular.module("myApp", ["ui.router", "satellizer", "ngStorage", "ngAnimate"])

///////satellizer oauth stuff/////
.config(function($stateProvider, $urlRouterProvider, $authProvider){
	
	$authProvider.github({
		clientId: "ec5a4e91c7264952a976"
	});
	$authProvider.facebook({
		clientId: "794880000635252"
	});
/////// end satelizer oauth section/////

	$urlRouterProvider.otherwise("home");

	$stateProvider
	.state("home", {url: "/home", templateUrl:"templates/home.html" , controller:"AuthCtrl"})
	.state("register", {url:"/register", templateUrl:"templates/register.html", controller:"AuthCtrl"})
	
	.state("main", {url:"/main", templateUrl:"templates/main.html", controller: "mainCtrl"})
	.state("main.edit", {url:"/edit", templateUrl:"templates/edit.html", controller:"editCtrl"})
	.state("main.add", {url:"/add", templateUrl:"templates/add.html", controller:"addCtrl"})

	.state("sample", {url: "/sample", templateUrl:"sample.html", controller:"sampleCtrl"})
	
})
