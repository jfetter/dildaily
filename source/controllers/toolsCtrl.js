angular.module("myApp")

.controller("toolsCtrl", function($scope, $rootScope, $timeout, $state, UtilityService, $http, $log){
	console.log("make flash cards, contact list, company list, email templates etc...")
	
	$scope.showInputForm = function(){
		console.log("SHOW INPUT")
		$scope.addCards = true;
	}

	$scope.addFlash = function(){

	}

	$scope.removeFlash = function(){

	}	

	$scope.playCards = function(){
		$scope.addCards= false;
	}

	$scope.links = [
	{name: "twitter",
	url: UtilityService.twitter || null},	
	{name: "gitHub",
	url: UtilityService.git || null},



	]; 


	// $scope.twitter = UtilityService.twitter;
	// $scope.git = UtilityService.git;
	// $scope.wordPress = UtilityService.wordPress;
	// $scope.linkedin = UtilityService.linkedin;
	// $scope.stackOverflow = UtilityService.stackOverflow;
	// $scope.angellist = UtilityService.angellist;



	$scope.addSocial = function(){

	}	

	$scope.removeSocial = function(){

	}

	$scope.closeTool = function(){
		$scope.addCards= false;
		$rootScope.toolBelt = null;
		$state.go("main");
	}



})