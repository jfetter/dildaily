"use strict";

angular.module("myApp")

.controller('editCtrl', function($scope, $rootScope, $state, $http) {
	if (!$rootScope.editThis){
		$state.go('main');
	}
	// hide or show modal
	$scope.addEdit = true;
	console.log("ADDEDIT", $scope.addEdit)

	$scope.closePopUp = function(){
		$state.go('main')
	}



	console.log("$rootScope.editThis", $rootScope.editThis);
  $scope.task_name = $rootScope.editThis.task_name;
  $scope.task_description = $rootScope.editThis.task_description;
  //$scope.completeBy = $rootScope.editThis.completeBy;
  $scope.frequency = $rootScope.editThis.frequency;
  $scope.additional_info = $rootScope.editThis.additional_info;

  $scope.submitTask = function(){
		console.log("item to edit", $rootScope.editThis)
			var task = {};
			$scope.todo = true;
			task.taskId = $rootScope.editThis._id;
			task.user_id = localStorage.dd_id;
			task.task_name = $scope.task_name;
			task.task_description = $scope.task_description;
			task.frequency = $scope.frequency;
			task.completeBy = $scope.completeBy;
			task.email_reminder = $scope.task_email_reminder;
			task.additional_info = $scope.task_additional_info;
			task.completed = false;
			task.task_type = "todo";

		$http.put("/tasks/edit", task)
		.then(function(res){
			console.log(res);
			//$scope.$parent.loadUserTasks();
			// clear $rootScope.editThis?
			console.log("RES BODY IN EDIT", res.data);
			location.reload();
			//$rootScope.tasks = res.data
			$state.go('main');
			}, function(err){
				console.log(err)
			})
		}

  $scope.submit = function(){
  	console.log("you clicked submit");
  }

})


.directive('taskModal', function(){
  return{
    templateUrl: "partials/task-modal.html"
  }
})

