
"use strict";

angular.module("myApp")

	.controller("addCtrl", function($scope, $rootScope, $state, $http, UtilityService){
	console.log("IN ADD CTRL"); 
	$scope.todo = true; 
	console.log($scope.addEdit);

	// for adding contacts -- 
	// conncect all contacts at a company
	// search -contact people / contact companies
	// split left right view for contacts
	// tools: email templates:
	// call to action, we vs I vs you score

	   $scope.$watch('appt_date', function(newData, oldData){
	   	// set follow up for 3 days after appointment
  	$scope.followup_date = new Date(newData) + (Date.now() + (86400 * 1000 * 3))
  })

	$scope.addNew = function(){
		console.log("IN ADD NEW")
		if ($rootScope.addThis.name === 'Task') {
			submitTask();
		} else if ($rootScope.addThis.name === 'Appointment' || $rootScope.addThis.name === 'Contact' ){ 
			var type = $rootScope.addThis.name;
			console.log("ADDDING ", type)
			addContact(type);
		}
	}

	var addContact = function(item){

		$scope.todo = false; 
		//var myId = $rootScope.myId; 
		console.log("in addAPPT OR CONTACT. TYPE:", $rootScope.editThis.category )
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
		
	  newContact.user_id = $rootScope._myId;
		newContact.next_appt_date = $scope.appt_date;
		newContact.contact_name = $scope.contact_name;
		newContact.company_name = $scope.company_name;
		newContact.appointment_time = $scope.appt_time;
		newContact.contact_phn = $scope.contact_phn;
		newContact.contact_email = $scope.contact_email;
		newContact.linkedin = $scope.linkedin;
		newContact.contact_method = $scope.contact_method;
		newContact.followup_date = $scope.followup_date;
		$http.post("/contacts/newcontact", newContact )
	.then(function(res){
			$rootScope.editThis = null;
			console.log("LOOK WHAT I BROUGHT BACK",res.data);
			UtilityService.loadData();
			$state.go('main')
	},function(err){
			console.log(err);
		})
	}

	var submitTask = function(){
		var task = {};
		$scope.todo = true;
		task.user_id = $rootScope._myId;
		task.task_name = $scope.task_name;
		task.task_description = $scope.task_description;
		task.frequency = $scope.frequency;
		task.completeBy = $scope.completeBy;
		task.email_reminder = $scope.task_email_reminder;
		task.additional_info = $scope.task_additional_info;
		task.completed = false;
		task.task_type = "todo";
	  if (!$rootScope.tasks) $rootScope.tasks = [];
		$http.post("/tasks/newtodo", task )

		.then(function(res){
			$rootScope.addThis = null;
			console.log("LOOK WHAT I BROUGHT BACK",res.data);
			$state.go('main');
			UtilityService.loadData();
	},function(err){
			console.log(err);
		})
	}


})




