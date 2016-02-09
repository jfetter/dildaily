
"use strict";

angular.module("myApp")

	.controller("addCtrl", function($scope, $rootScope, $http, $state, UtilityService){
	console.log("IN ADD CTRL"); 
	$scope.todo = true; 
	console.log($scope.addEdit);

	// for adding contacts -- 
	// conncect all contacts at a company
	// search -contact people / contact companies
	// split left right view for contacts
	// tools: email templates:
	// call to action, we vs I vs you score

	$scope.closePopUp = function(){
		$state.go("main")
	}

	$scope.addAppt = function(){
		console.log("add meeting")
		$scope.todo = false; 
		//$state.go("main.add")
	}

	$scope.submitTask = function(){
		var task = {};
		$scope.todo = true;
		task.user_id = localStorage.dd_id;
		task.task_name = $scope.task_name;
		task.descript = $scope.task_description;
		task.frequency = $scope.frequency;
		task.completeBy = $scope.completeBy;
		task.email_reminder = $scope.task_email_reminder;
		task.additional_info = $scope.task_additional_info;
		task.completed = false;
		task.task_type = "todo";
	  if (!$rootScope.tasks) $rootScope.tasks = [];
		$http.post("/tasks/newtodo", task )

		.then(function(res){
			console.log("LOOK WHAT I BROUGHT BACK",res.data);
			UtilityService.loadData();
			$state.go('main')
	},function(err){
			console.log(err);
		})
	}

	$scope.createNewAppt = function(){
		console.log("create new appt")
	}

})




