'use strict';

angular.module("myApp", ["ui.router", "firebase"])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/home");

	$stateProvider
	.state("home", {url: "/home", templateUrl:"templates/home.html" , controller:"homeCtrl"})
	.state("register", {url:"/register", templateUrl:"templates/register.html", controller:"registerCtrl"})

	.state("sample", {url: "/sample", templateUrl:"/sample.html", controller:"sampleCtrl"})
	
})
