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
		$state.go('home');
	};

var	assembleSearch = function(searchArray, searchTerm){
	searchArray.forEach(function(item){
		$scope.searchArray.push(item[searchTerm])
	})
}

$scope.$watch("cat", function(cat, oldCat){
		console.log("NEW CAT", cat)
		var searchTerm;
		var searchArray = [];
		$scope.searchArray = [];
		if (cat === 'tasks'){
			searchArray = $rootScope.tasks;
			searchTerm = "task_name";
		} else if (cat === 'archives'){
			searchArray = $rootScope.archives
			searchTerm;
			console.log("archives coming soon")
		}else if (cat === 'contacts'){
			searchArray = $rootScope.contacts
			searchTerm;
			console.log("contacts coming soon")
		}else if (cat === 'tools'){
			searchArray = $rootScope.contacts
			searchTerm;
			console.log("prolly be a while til I have tools")
		}
			assembleSearch(searchArray, searchTerm)
			//console.log($scope.searchFor);
			//$scope.searchArray = searchArray[searchTerm];
			//console.log($scope.searchArray);
		})

		console.log("cat", $scope.cat);

	// $scope.searchTasks = function(){
	// 	console.log("TASK", $scope.searchFor);
	// 	console.log("cat", $scope.searchCat);
	// 	var cat;
	// 	var searchTerm;
	// 	$scope.searchResults = [];
	// 	if ($scope.searchCat === 'tasks'){
	// 		cat = $rootScope.tasks;
	// 		searchTerm = "task_name";
	// 	} else if ($scope.searchCat === 'archives'){
	// 		cat = $rootScope.archives
	// 		searchTerm;
	// 		console.log("archives coming soon")
	// 	}else if ($scope.searchCat === 'contacts'){
	// 		cat = $rootScope.contacts
	// 		searchTerm;
	// 		console.log("contacts coming soon")
	// 	}else if ($scope.searchCat === 'tools'){
	// 		cat = $rootScope.contacts
	// 		searchTerm;
	// 		console.log("prolly be a while til I have tools")
	// 	}
	// 		cat.forEach(function(item){
	// 			if (item[searchTerm].match($scope.searchFor))
	// 			$scope.searchResults.push(item[searchTerm])
	// 		})
	// 		console.log($scope.searchFor);
	// }

// 			$scope.$watch("searchFor", function(newVal){
// 			$searchResults = newVal;
// 		})


	


	$scope.showDetails=function(result){
		//$state.go(detailsPage);
		console.log("build details view")
	}

})
