'use strict';

//take out nganimate and ngstorage if I dont end up using them in final product
angular.module("myApp", ["ui.router", "satellizer", "ngStorage", "ngAnimate", "angularMoment"])

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
	
	.state("main", {url:"/main", templateUrl:"templates/main.html", controller: "mainCtrl"})
	.state("main.edit", {url:"/edit", templateUrl:"templates/edit.html", controller:"editCtrl"})
	.state("main.add", {url:"/add", templateUrl:"templates/add.html", controller:"addCtrl"})

	.state("sample", {url: "/sample", templateUrl:"sample.html", controller:"sampleCtrl"})
	
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


