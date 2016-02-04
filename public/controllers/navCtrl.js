"use strict";

angular.module("myApp")

.controller("navCtrl", function($scope, $rootScope, $state, UtilityService){
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

		console.log("cat", $scope.searchCat);

	$scope.searchTasks = function(){
		console.log("TASK", $scope.searchFor);
		console.log("cat", $scope.searchCat);
		var cat;
		var searchTerm;
		$scope.searchResults = [];
		if ($scope.searchCat === 'tasks'){
			cat = $rootScope.tasks;
			searchTerm = "task_name";
		} else if ($scope.searchCat === 'archives'){
			cat = $rootScope.archives
			searchTerm;
			console.log("archives coming soon")
		}else if ($scope.searchCat === 'contacts'){
			cat = $rootScope.contacts
			searchTerm;
			console.log("contacts coming soon")
		}else if ($scope.searchCat === 'tools'){
			cat = $rootScope.contacts
			searchTerm;
			console.log("prolly be a while til I have tools")
		}
			cat.forEach(function(item){
				if (item[searchTerm].match($scope.searchFor))
				$scope.searchResults.push(item[searchTerm])
			})
			console.log($scope.searchFor);
	}

// 			$scope.$watch("searchFor", function(newVal){
// 			$searchResults = newVal;
// 		})

// 	// $scope.searchTasks = function(){
// 	// 	console.log("TASK", $scope.searchFor);
// 	// 	console.log("cat", searchCat);
	
// $scope.$watch("cat", function(searchCat)){
// 		var searchTerm;
// 		var searchArray
// 		$scope.searchArray = [];
// 		if (searchCat === 'tasks'){
// 			searchArray = $rootScope.tasks;
// 			searchTerm = "task_name";
// 		} else if (searchCat === 'archives'){
// 			searchArray = $rootScope.archives
// 			searchTerm;
// 			console.log("archives coming soon")
// 		}else if (searchCat === 'contacts'){
// 			searchArray = $rootScope.contacts
// 			searchTerm;
// 			console.log("contacts coming soon")
// 		}else if (searchCat === 'tools'){
// 			searchArray = $rootScope.contacts
// 			searchTerm;
// 			console.log("prolly be a while til I have tools")
// 		}
// 			// searchArray.forEach(function(item){
// 			// 	if (item[searchTerm].match($scope.searchFor))
// 			// 	$scope.searchArray.push(item[searchTerm])
// 			// })
// 			// console.log($scope.searchFor);
// 			$scope.searchArray = searchArray[searchTerm];
// 	 }
// }

	$scope.showDetails=function(result){
		//$state.go(detailsPage);
		console.log("build details view")
	}

})
