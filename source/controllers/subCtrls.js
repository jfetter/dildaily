"use strict";

angular.module("myApp")

.controller("subCtrl1", function($scope, $rootScope, UtilityService){
	  $rootScope.$watch('currentView', function(newView, oldView){
  	//console.log(newView, "= new View in sub");
		$scope.colH1 = 'Task Name';
		$scope.colH2 = 'Description';
		$scope.colH3 = 'Frequency';
		$scope.colH4 = 'Complete By';
		$scope.colH5 = 'Done?';
		$scope.colH6 = "Edit/Delete"
		$scope.colH7 = "done"
		$scope.td_1 = "task_name";
		$scope.td_2 = "task_description";
		$scope.td_3 = "frequency";
		$scope.td_4 = "completeBy";
		if (newView == 'This Week'){
			$scope.dayRowData = $rootScope.thisweek.tasks
		console.log("DAY ROW DATA TOP", $scope.dayRowData)
		} else if (newView  == 'Today') {
			$scope.dayRowData = UtilityService.today.tasks
		}
	});
})

.controller("subCtrl2", function($scope, $rootScope, UtilityService){
	UtilityService.loadData();
	$rootScope.$watch('currentView', function(newView, oldView){
		$scope.colH1 = 'Contact Name';
		$scope.colH2 = 'Company';
		$scope.colH3 = 'Contact Method';
		$scope.colH4 = 'Date';
		$scope.colH5 = 'Time';
		$scope.colH6 = "Edit/Delete"
		$scope.td_1 = "contact_name";
		$scope.td_2 = "company_name";
		$scope.td_3 = "contact_method";
		$scope.td_4 = "next_appt_date";
		$scope.td_5 = "appointment_time";
		if (newView == 'This Week'){
			$scope.dayRowData = $rootScope.thisweek.appointments
		console.log("DAY ROW DATA Middle", $scope.dayRowData)
		} else if (newView == 'Today') {
			$scope.dayRowData = UtilityService.today.appointments
		}
	});
})

.controller("subCtrl3", function($scope, $rootScope, UtilityService){
	$rootScope.$watch('currentView', function(newView, oldView){
		$scope.colH1 = 'Contact Name';
		$scope.colH2 = 'Company';
		$scope.colH3 = 'Contact Method';
		$scope.colH4 = 'Date';
		$scope.colH5 = 'Time';
		$scope.colH6 = "Edit/Delete"
		$scope.td_1 = "contact_name";
		$scope.td_2 = "company_name";
		$scope.td_3 = "contact_method";
		$scope.td_4 = "next_appt_date";
		$scope.td_5 = "appointment_time";
		console.log("SUB 3 ROOT CUR VIEW", $rootScope.currentView)
		if (newView == 'This Week'){
			$scope.dayRowData = $rootScope.thisweek.followUps
		} else if (newView == 'Today') {
			$scope.dayRowData = UtilityService.today.followUps
		console.log("DAY ROW DATA BOTTOM", $scope.dayRowData)
		}
	});
})



