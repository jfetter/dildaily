'use strict';

//take out nganimate and ngstorage if I dont end up using them in final product
angular.module("toWork", ["ui.router", "ui.bootstrap", "satellizer", "ngAnimate", 'angular-jwt', 'ngCookies', 'angularMoment']) 

.config(function($stateProvider, $urlRouterProvider, $authProvider){
	
	
///////satellizer oauth stuff/////
	$authProvider.github({
		clientId: "ec5a4e91c7264952a976"
	});
	$authProvider.facebook({
		clientId: "794880000635252"
	});

	$urlRouterProvider.otherwise("home");

	$stateProvider
	.state("home", {url: "/home", templateUrl:"templates/home.html" , controller:"AuthCtrl"})
	.state("register", {url:"/register", templateUrl:"templates/register.html", controller:"AuthCtrl"})
	.state("main", {url:"/main", templateUrl:"templates/main.html", controller: "mainCtrl"})
	.state("main.edit", {url:"/edit", templateUrl:"templates/input-form.html", controller:"editCtrl"})
	.state("main.add", {url:"/add", templateUrl:"templates/input-form.html", controller:"addCtrl"})
	.state("main.tools", {url:"/tools", templateUrl:"directives/tools.html", controller:"toolsCtrl"})
	// to display addl details 
	.state("main.details", {url:"/details", templateUrl:"templates/details.html", controller:"detailsCtrl"})	
})




