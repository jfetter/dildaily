"use strict";

angular.module("myApp")

.controller('editCtrl', function($scope, $rootScope) {
	// hide or show modal
	$scope.addEdit = true;
	console.log("ADDEDIT", $scope.addEdit)

	console.log("$rootScope.editThis", $rootScope.editThis);
  $scope.task_name = "test";
  $scope.task_description = "test";
  //$scope.completeBy = "test";
  $scope.frequency = "weekly";
  $scope.additional_info = "test";

  $scope.editTask = function(){
    var taskId = $rootScope.editThis._id;
		var userId = $rootScope.editThis.user_id;
		console.log("item to edit", item)
			var task = {};
			$scope.todo = true;
			task.user_id = localStorage.dd_id;
			task.task_name = $scope.task_name;
			task.task_description = $scope.task_description;
			task.frequency = $scope.frequency;
			task.completeBy = $scope.completeBy;
			task.email_reminder = $scope.task_email_reminder;
			task.additional_info = $scope.task_additional_info;
			task.completed = false;
			task.task_type = "todo";

		$http.put("/tasks/edit", {taskId: taskId, userId: userId, newInfo: task})
		.then(function(res){
			console.log(res);
			$scope.$parent.loadUserTasks();
			// clear $rootScope.editThis?
			console.log("RES BODY IN EDIT", res.body);
			console.log("RES BODY JSON IN EDIT", JSON.parse(res.body));
			//$rootScope.tasks = res.body
			$state.go('main');
			}, function(err){console.log(err)})
		}

  $scope.submit = function(){
  	console.log("you clicked submit");
  }

  $scope.cancel = function() {
    console.log("cancel clicked")
    $uibModalInstance.dismiss('cancel');
  };
})


.directive('taskModal', function(){
  return{
    templateUrl: "partials/task-modal.html"
  }
})

