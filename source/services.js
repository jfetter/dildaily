"use strict";

angular.module("myApp")

.service("UtilityService", function($http, $rootScope, $cookies, jwtHelper){
	this.tasks = [];
	this.archives = [];

	$rootScope.appTitle = "Agent duh";
	$rootScope.userData = {};

	this.loadData = function(){
		var data; 
		$http.get(`users/login/${localStorage.dd_id}`)
			.then(function(res){
			console.log("RES BODY IN SERVICE CTRL",  res.data)
			data = res.data;
			updateView(data)
		}, function(err){ console.error(err)})
			return data;
	}


	 var updateView = function(data){
	 	console.log("GREETINGS FROM UPDATE VIEW")
	 		if(!data){return}
	 		var contacts = data.contacts; 
	 		$rootScope.contacts = contacts; 
	 		var tasks = [];
	 		var appointments =[];
	 		var archives = [];
	 		var aLength = data.appointments.length - 1;
	 		var tLength = data.todos.length -1; 
	 		console.log("TLENGTH", tLength)
	 		for (var i = 0; i < aLength; i ++){
	 			if (data.appointments[i].appointment_date < Date.now()){
	 				archives.push(data.appointments[i])
	 			} else {
	 				appointments.push(data.appointments[i])
	 			}
	 			if (i === aLength - 1){
	 				$rootScope.userData.appointments = appointments; 
	 			}
	 		}

	 		// data.todos.forEach(function(item, index){
	 			for (var j = 0; j < tLength; j ++){
	 			if (data.todos[j].completed === false 
	 				|| data.todos[j].completeBy === null 
	 				|| data.todos[j].completeBy <= Date.now()){
	 				tasks.push(data.todos[j])
	 			} else {
	 				archives.push(data.todos[j])
	 				console.log("PUSHED", data.todos[j], "TO ARCHIVES")
	 			}
	 			if (j === tLength -1){
	 				$rootScope.tasks = tasks; 
	 				//this.archives.concat
	 				console.log("ROOTSCOPE DATA TASKS", $rootScope.tasks)
	 			}
	 		}
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

