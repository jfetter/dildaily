"use strict";

angular.module("myApp")

.controller("navCtrl", function($scope,$timeout, $rootScope, $state, UtilityService, $cookies){
	// hide login or logout button

	$scope.cats = UtilityService.cats;

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
		//localStorage.removeItem("satellizer_token");
		//localStorage.removeItem("dd_id");
		$scope.cat = null;
		localStorage.clear();
		$cookies.clear();
		UtilityService.loggedIn();
		$state.go('home');
	};

	console.log("cat", $scope.cat);

	//if ($scope.searchArray.length){$scope.searchArray.sort()};
function assembleSearch(searchArray, searchTerm){
	// $timeout(function(){
		if (!searchArray || !searchTerm) return;
		console.log("searchArray", searchArray)
		$scope.searchArray = [];
		searchArray.forEach(function(item){
			$scope.searchArray.push(item[searchTerm])	
	// },10)
		
	})
}

var searchCases = function(cat){
	var data = $rootScope.userData; 
	console.log("data", data);
		if (cat === 'Tasks'){
			var searchArray = data.todos;
			var searchTerm = "task_name";
			console.log("SEARCH ARRAY1", searchArray);
		} else if (cat === 'Archives'){
			var searchArray = data.archives;
			var searchTerm;
			console.log("archives coming soon")
		} else if (cat === 'Today'){
			var searchArray = $rootScope.today;
			var searchTerm;
			console.log("TODAY coming soon")
		} else if (cat === 'This Week'){
			var searchArray = $rootScope.week;
			var searchTerm;
			console.log("THIS WEEK coming soon")
		} else if (cat === 'Appointments'){
			var searchArray = data.appointments;
			var searchTerm;
			console.log("appointments coming soon")
		}else if (cat === 'Contacts'){
			var searchArray = data.contacts;
			var searchTerm;
			console.log("contacts coming soon")
		}else if (cat === 'Tools'){
			var searchArray = $rootScope.tools;
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

$scope.$watch('cat', function(newC, oldC){
	console.log("CAT", newC);
	$rootScope.category = newC;
})

$scope.$watch("searchFor", function(newS, oldS){
	console.log("change")
	if ($scope.cat){
		var cat = $scope.cat;
		console.log("CAT IS", cat, "searchFor is", newS)
		var searchObject = searchCases(cat);
		console.log(searchObject);
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

$scope.showAll = function(){
	console.log("write logic to show all tasks of a certain category")
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
