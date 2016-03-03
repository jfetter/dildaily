"use strict";

angular.module("toWork")

.controller('editCtrl', function($scope, $timeout, $rootScope, $state, $http, UtilityService) {
	if (!$rootScope.editThis){
		$state.go('main');
	}

	//direct to appointment or task if sent from search bar
	UtilityService.grabItem();

	// hide or show modal
	//$scope.addEdit = true;
	//console.log("ADDEDIT", $scope.addEdit)

	//console.log("$rootScope.editThis", $rootScope.editThis);
  $scope.item_name = $rootScope.editThis.item_name;
  $scope.task_description = $rootScope.editThis.task_description;
  console.log($scope.completeBy, "$scope.completeBy")
  $scope.completeBy = new Date($rootScope.editThis.completeBy) || Date.now();
  $scope.frequency = $rootScope.editThis.frequency;
  $scope.additional_info = $rootScope.editThis.additional_info;

  $scope.editTask = function(){
		console.log("item to edit", $rootScope.editThis)
			var task = {};
			$scope.todo = true;
			task.taskId = $rootScope.editThis._id;
			task.user_id = localStorage.dd_id || "";
			task.item_name = $scope.task_name || "";
			task.task_description = $scope.task_description || "";
			task.frequency = $scope.frequency || "";
			task.completeBy = $scope.completeBy || "";
			task.email_reminder = $scope.task_email_reminder || "";
			task.additional_info = $scope.additional_info || "";
			task.completed = false;
			task.task_type = "todo";
			console.log("EDIT TASK", task);
		$timeout(function(){
			$http.put("/tasks/edit", task)
			},10)
		.then(function(res){
			console.log("RES BODY IN EDIT", res);
			UtilityService.loadData();
			$state.go('main');
			}, function(err){
				console.log(err);
			})
		}

		$scope.contact_name = $rootScope.editThis.item_name;
		$scope.company_name = $rootScope.editThis.company_name;
		$scope.contact_method = $rootScope.editThis.contact_method;
		$scope.appt_date = new Date($rootScope.editThis.next_appt_date) || Date.now();
		$scope.appointment_time = $rootScope.editThis.appointment_time;
		$scope.contact_email = $rootScope.editThis.contact_email;
		$scope.linkedin = $rootScope.editThis.linkedin;
		$scope.last_contact_date = new Date($rootScope.editThis.last_contact_date) || Date.now(); 
		if ($rootScope.editThis.category == 'appointment'){
			$scope.followup_date = new Date($rootScope.editThis.followup_date)  
		} else{
			$scope.followup_date = new Date($rootScope.editThis.last_contact_date)
		}
		$scope.contact_notes = $rootScope.editThis.contact_notes;
		$scope.appt_notes = $rootScope.editThis.appt_notes;
		$scope.appt_time = $rootScope.editThis.appt_time;
		$scope.contact_method = $rootScope.editThis.contact_method;
		$scope.recurrence = $rootScope.editThis.frequency;
		$scope.contact_phn = $rootScope.editThis.contact_phn

	$scope.editContact = function(){
		console.log("CONTACT to edit", $rootScope.editThis)
		var newContact = {};
if ($rootScope.editThis.category === "Contact"){
		newContact.contact_notes = $scope.contact_notes;
		newContact.category = 'Contact';
	}else{
		newContact.category = 'Appointment';
		newContact.appt_notes = $scope.appt_notes;
		newContact.recurrence = $scope.recurrence;
	}
	if ($scope.both){
		newContact.category = 'both';
	}
		newContact.contactId = $rootScope.editThis._id;
	  newContact.user_id = $rootScope._myId;
		newContact.next_appt_date = $scope.appt_date;
		newContact.item_name = $scope.contact_name;
		newContact.company_name = $scope.company_name;
		newContact.appointment_time = $scope.appt_time;
		newContact.contact_phn = $scope.contact_phn;
		newContact.contact_email = $scope.contact_email;
		newContact.linkedin = $scope.linkedin;
		newContact.contact_method = $scope.contact_method;
		newContact.followup_date = $scope.followup_date;
		$timeout(function(){
			$http.put("/contacts/edit", newContact)
			},10)
		.then(function(res){
			console.log("RES BODY IN EDIT", res);
			UtilityService.loadData();
			$state.go('main');
			}, function(err){
				console.log(err);
			})
		}


})




