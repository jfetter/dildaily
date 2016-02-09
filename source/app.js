'use strict';

//take out nganimate and ngstorage if I dont end up using them in final product
angular.module("myApp", ["ui.router", "ui.bootstrap", "satellizer", "ngAnimate", 'angular-jwt', 'ngCookies', "angularMoment"])

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
	.state("home", {url: "/home", templateUrl:"templates/home.html" , controller:"AuthCtrl", authenticate: false})
	.state("register", {url:"/register", templateUrl:"templates/register.html", controller:"AuthCtrl", authenticate: false})
	.state("details", {url:"/details", templateUrl:"templates/details.html", controller:"detailsCtrl", authenticate: false})
	.state("main", {url:"/main", templateUrl:"templates/main.html", controller: "mainCtrl"})
	.state("main.completed", {url:"/completed", templateUrl:"templates/completed.html", controller:"mainCtrl"})	
	.state("main.edit", {url:"/edit", templateUrl:"templates/input-form.html", controller:"editCtrl"})
	.state("main.add", {url:"/add", templateUrl:"templates/input-form.html", controller:"addCtrl"})
	.state("main.tools", {url:"/add", templateUrl:"templates/input-form.html", controller:"toolsCtrl"})
	//for error messages etc
	.state("main.alert", {url:"/alert", templateUrl:"templates/alert.html", controller:"alertCtrl"})
	// to display addl details 
	.state("main.details", {url:"/details", templateUrl:"templates/details.html", controller:"detailsCtrl"})	
})

////NEED TO LEARN MORE AND SET UP LOGIN STUFF
.run(function ($rootScope, $state, AuthService) {
  // $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  //   if (toState.authenticate && !AuthService.isAuthenticated()){
  //     // User isn’t authenticated
  //     $state.transitionTo("login");
  //     event.preventDefault(); 
  //   }
  // });
});


