"use strict";

angular.module("toWork")

.controller("navCtrl", function($scope,$timeout, $rootScope, $state, UtilityService, ToolsService, $cookies){

	$scope.cats = UtilityService.cats;
	
	$scope.toolsArray = ToolsService.toolsArray; //, "Social Media"

	$scope.$watch('toolBelt', function(newVal, oldVal ){
		goToTool();
	})

	$rootScope.$watch('_myId', function(newVal, oldVal){
		$scope._myId = newVal; 
	})

	var goToTool = function(){
		ToolsService.selectedTool = $scope.toolBelt;
		$state.go("main.tools");
	}

	$scope.logOut = function(){
		$scope.cat = null;
		localStorage.clear();
		UtilityService.removeCookies();
		//UtilityService.loggedIn();
		$state.go('home');
	};

	//if ($scope.searchArray.length){$scope.searchArray.sort()};
function assembleSearch(searchArray, searchTerm){
		if (!searchArray || !searchTerm) return;
		console.log("searchArray", searchArray)
		$scope.searchArray = [];
		searchArray.forEach(function(item){
		$scope.searchArray.push(item[searchTerm])	
	})
}

var searchCases = function(cat){
		if (cat === 'Tasks'){
			var searchArray = UtilityService.tasks;
			var searchTerm = "task_name";
		} else if (cat === 'Completed'){
			var searchArray = UtilityService.Completed;
			var searchTerm = "contact_name"
		} else if (cat === 'Today'){
			var searchArray = UtilityService.today;
			var searchTerm = "task_name";
		} else if (cat === 'This Week'){
			var searchArray = UtilityService.thisweek;
			var searchTerm = "contact_name";
		} else if (cat === 'Appointments'){
			var searchArray = UtilityService.appointments;
			var searchTerm = "contact_name";
		}else if (cat === 'Contacts'){
			var searchArray = UtilityService.contacts;
			var searchTerm = "contact_name";
		}else if (cat === 'Companies'){
			var searchArray = UtilityService.companies;
			var searchTerm = "company_name";
		}
		return {searchArray: searchArray, searchTerm: searchTerm}
}

var searchAllCats = function(){
		console.log("set up this function")
		// console.log("combine all arrays for search")
		// ["tasks", "Completed", "contacts", "tools"].forEach(function(category){
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
