"use strict";

angular.module("myApp")

.service("UtilityService", function($http, $rootScope, $cookies, jwtHelper){
	this.tasks = [];



	$rootScope.appTitle = "Agent duh";
	
	// $rootScope.myName; 
	// $rootScope.myId;
	//  var token = localStorage.satellizer_token;
	//  	if(token){
	// 	$rootScope.myInfo = (jwtHelper.decodeToken(token))
	// 	$rootScope.myId = $rootScope.myInfo._id;
	// }

	this.console = function(){
		console.log("congrats you made it to the service")
	}

//this.allViews = ["Tasks", "Appointments", "Daily Schedule", "Weekly Scheudle", "Archives"]
//this.cat;
//prolly take this out of service 
// being used to hide and show login logout on nave ctrl
	this.loggedIn = function(){
		if (localStorage.satellizer_token){
			return true;
		} return false; 
	}



this.sortTasks = function(sortData, sortBy, reverseOrder){
		console.log("sortData2", sortData )
		console.log("sortBy", sortBy )
		console.log("zeroth", sortData[0][sortBy] )
	if (sortBy === "completeBy"){
		// $scope.sorted2 = !$scope.sorted2;
		sortData.sort(function(a,b){
			if (reverseOrder){
				return new Date(a[sortBy]) - new Date(b[sortBy]);
			}
  	return new Date(b[sortBy]) - new Date(a[sortBy]);
	});
	} else {
		// $scope.sorted = !$scope.sorted;
			sortData.sort(function(a,b){
				return b[sortBy].toLowerCase() > a[sortBy].toLowerCase()
			})
			if(reverseOrder){
				sortData.reverse();
			}
		}
	}
})

///authentication service using UI ROUTER AUTH STUFF
.service('AuthService',function ($http) {

  this.isAuthenticated = function (params) {
      if(typeof localStorage.token === 'undefined'){
        return false;    
      }else if(localStorage.token == null){
          return false;
      }else{
          return true;
      }
  }
});

