"use strict";

angular.module("myApp")

.controller("navCtrl", function($scope,$timeout, $rootScope, $state, UtilityService){
	// hide login or logout button

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
		UtilityService.loggedIn();
		$state.go('home');
	};

	console.log("cat", $scope.cat);


	
	//if ($scope.searchArray.length){$scope.searchArray.sort()};
function assembleSearch(searchArray, searchTerm){
	// $timeout(function(){
		if (!searchArray || !searchTerm) return;
		$scope.searchArray = [];
		searchArray.forEach(function(item){
			$scope.searchArray.push(item[searchTerm])	
	// },10)
		
	})
}

var searchCases = function(cat){
		if (cat === 'tasks'){
			var searchArray = $rootScope.tasks;
			var searchTerm = "task_name";
		} else if (cat === 'archives'){
			var searchArray = $rootScope.archives
			var searchTerm;
			console.log("archives coming soon")
		}else if (cat === 'contacts'){
			var searchArray = $rootScope.contacts
			var searchTerm;
			console.log("contacts coming soon")
		}else if (cat === 'tools'){
			var searchArray = $rootScope.tools
			var searchTerm;
			console.log("prolly be a while til I have tools")
		}
		return {searchArray: searchArray, searchTerm: searchTerm}
}
var searchAllCats = function(){
		console.log("when there are more categories set up this function")
		// console.log("combine all arrays for search")
		// ["tasks", "archives", "contacts", "tools"].forEach(function(category){
		// var cat = category;
		// var searchObject = searchCases(cat);
		// var searchArray = searchObject.searchArray;
		// var searchTerm = searchObject.searchTerm;
		// assembleSearch(searchArray, searchTerm);
		//})
	}

$scope.$watch("searchFor", function(oldS, newS){
	console.log("change")
	if ($scope.cat){
		var cat = $scope.cat;
		var searchObject = searchCases(cat);
		var searchArray = searchObject.searchArray;
		var searchTerm = searchObject.searchTerm; 
		assembleSearch(searchArray, searchTerm)
		//console.log($scope.searchFor);
		//$scope.searchArray = searchArray[searchTerm];
		//console.log($scope.searchArray);
	} else {
		searchAllCats();
	}
		})


$scope.searchAllCats = function(){
	searchAllCats();
}

	$scope.clearSearch = function(){
		if (!$scope.searchFor){		
			console.log("CAT BEFORE", $scope.cat)
			$scope.searchArray = [];
			console.log("CAT AFTER", $scope.cat)
		}
	}

	$scope.showDetails=function(result){
		//$state.go(detailsPage);
		console.log("build details view")
	}

})
