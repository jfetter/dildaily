"use strict";

angular.module("myApp")

.controller("navCtrl", function($scope, $state, UtilityService){
	// hide login or logout button

		function twoWaySearch(catergory){

		}

	$scope.loginButton = function(){
		return UtilityService.loggedIn();
	} 

	$scope.goToMyTasks =function(){
		console.log("my tasks button clicked")
		if (localStorage.satellizer_token){
			$state.go("main");
		} else {
			console.log("login or register modal coming soon")
		}
	}

	$scope.logOut = function(){
		console.log("log out clicked");
		//localStorage.removeItem("satellizer_token");
		//localStorage.removeItem("dd_id");
		localStorage.clear();
		$state.go('home');
	};

		console.log("cat", $scope.searchCat);

	$scope.searchTasks = function(){
		console.log("TASK", $scope.searchFor);
		console.log("cat", $scope.searchCat);
		twoWaySearch($scope.searchCat);

	}

})
