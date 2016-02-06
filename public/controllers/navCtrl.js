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
//change="predictiveSearch()"
$rootScope.data = {
	repeatSelect: null,
	categories:[
	{id: 0, name: ""},
	{id: 1, name: "tasks"},
	{id: 2, name: "contacts"},
	{id: 3, name: "tools"},
	{id: 4, name: "archives"},
	],
};


	$scope.searchArray = [];
function assembleSearch(searchArray, searchTerm){
	console.log(searchArray,"searchArray", searchTerm ,"searchTerm")
	searchArray.forEach(function(item){
		$scope.searchArray.push(item[searchTerm])
	})
}

var searchThis = function(category){
		if (category === 'tasks'){
			var searchArray = $rootScope.tasks;
			var searchTerm = "task_name";
		} else if (category === 'archives'){
			var searchArray = $rootScope.archives
			var searchTerm;
			console.log("archives coming soon")
		}else if (category === 'contacts'){
			var searchArray = $rootScope.contacts
			var searchTerm;
			console.log("contacts coming soon")
		}else if (category === 'tools'){
			var searchArray = $rootScope.contacts
			var searchTerm;
			console.log("prolly be a while til I have tools")
		} else{
			return;
		}
		console.log("searchArray:", searchArray, "searchTerm:", searchTerm)
		return {searchArr: searchArray, searchTerm: searchTerm};
}

console.log("here kitty cat", $rootScope.data.repeatSelect)
$scope.predictiveSearch = function(){
	var cat = $rootScope.data.repeatSelect;
	console.log("Cat", cat)		
	var searchObject = searchThis(cat);
	var searchA = searchObject.searchArr;
	var searchTerm = searchObject.searchTerm; 
	assembleSearch(searchA, searchTerm)
	//console.log($scope.searchFor);
	//$scope.searchArray = searchArray[searchTerm];
	//console.log($scope.searchArray);
		};


$scope.searchAllCat = function(){
	console.log("combine all arrays for search")
	["tasks", "archives", "contacts", "tools"].forEach(function(cat){
	var searchObject = searchThis(cat);
	console.log("search obj ",searchObject);
	var searchRa = searchObject.searchArr;
	console.log("search array ",searchRa);
	var searchTerm = searchObject.searchTerm;
	console.log("search Term ",searchTerm);
	assembleSearch(searchRa, searchTerm);
	})
}

	$scope.showDetails=function(result){
		//$state.go(detailsPage);
		console.log("build details view for", result)
	}

})
