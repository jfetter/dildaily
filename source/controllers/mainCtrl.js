"use strict";

angular.module("myApp")

.controller("mainCtrl", function($scope, $rootScope, $timeout, $state, UtilityService, $http, $log){
	 UtilityService.setUserInfo();
	 if (!$rootScope._myId){
			$state.go("home");
			return;
	 } 

	$rootScope.category = $rootScope.category ? $rootScope.category :'Tasks';
  UtilityService.setUserInfo();

//myData is set in Utility service
  $rootScope.$watch('myData', function(newData, oldData){
  	if ($rootScope.myData){	
  		console.log("LOADED DATAAAAA", newData);
  		updateView(newData);
  	}
  })

//category is set in the navCtrl upon drop-down 'cat' change
  $rootScope.$watch('category', function(newCategory, oldCategory){
  	console.log(newCategory, "= newCategory in watch")
  	$scope.currentView = newCategory;
  	if ($rootScope.myData){	
  		updateView($rootScope.myData);
  	} else{
  }
});


	 function updateView(data){
	 		if (!$rootScope.myData){return}
	 		if ($scope.currentView == undefined){
	 			console.log("CATEGORY IS UNDEFINED")
	 			$scope.currentView = 'Tasks';
	 		} 
	 		console.log("DAATAAA IN UPDATE VIEW", data)

	 			 var tHeads = {};
	 			 var rowData = {}; 
	 if (!$scope.tHeads || $scope.currentView === 'Tasks'){
	 			//dataPool = $rootScope.tasks;
			 	tHeads.col1= "Task Name";
	 			tHeads.col2= "Description"; 
	 			tHeads.col3= "Frequency"; 
	 			tHeads.col4= "Complete By"; 
	 			tHeads.col5= "Done?";
	 			tHeads.col6= "Edit/Delete"; 
	 			tHeads.col7= "archive";
	 			//rowData.task_name = $rootScope.task.task_name;
	 			$scope.r_1 = "task_name";
	 			$scope.r_2 = "task_description";
	 			$scope.r_3 = "frequency";
	 			$scope.r_4 = "completeBy";
	 			$scope.rowData = UtilityService.tasks;
	 			console.log("ROW DATA", $scope.rowData)
	 			$scope.tHeads = tHeads;
	 } else{
	 		if ($scope.currentView === 'Appointments'){
	 			tHeads.col1= "Contact Name";
	 			tHeads.col2= "Company"; 
	 			tHeads.col3= "Contact Method"; 
	 			tHeads.col4= "Appointment Date"; 
	 			tHeads.col5= "Appointment Time";
	 			tHeads.col6= "Edit/Delete"; 
	 			$scope.r_1 = "contact_name";
	 			$scope.r_2 = "coompany_name";
	 			$scope.r_3 = "contact_method";
	 			$scope.r_4 = "appointment_date";
	 			$scope.r_5 = "appointment_time";
	 			$scope.rowData = UtilityService.appointments;
	 			$scope.tHeads = tHeads;
	 		} else if ($scope.currentView === 'Contacts'){
	 			tHeads.col1= "Contact Name";
	 			tHeads.col2= "Company"; 
	 			tHeads.col3= "email"; 
	 			tHeads.col4= "phone"; 
	 			tHeads.col5= "next Contact Date";
	 			tHeads.col6= "Edit/Delete";  
	 			$scope.r_1 = "contact_name";
	 			$scope.r_2 = "coompany_name";
	 			$scope.r_3 = "contact_method";
	 			$scope.r_4 = "appointment_date";
	 			$scope.r_5 = "appointment_time";
	 			$scope.rowData = UtilityService.contacts;
	 			$scope.tHeads = tHeads;
	 	} else if ($scope.currentView === 'Archives'){
	 			tHeads.col1= "Name";
	 			tHeads.col2= "Description/Company"; 
	 			tHeads.col3= "Frequency"; 
	 			tHeads.col4= "Complete By"; 
	 			tHeads.col5= "Done?";
	 			tHeads.col6= "Edit/Delete"; 
	 			tHeads.col7= "archive";
	 			// if(){
	 			// 	$scope.r_1 = "task_name";
	 			// }
	 			$scope.r_1 = "task_name";
	 			$scope.r_2 = "task_description";
	 			$scope.r_3 = "frequency";
	 			$scope.r_4 = "completeBy";
	 			$scope.rowData = UtilityService.archives;
	 			$scope.tHeads = tHeads;
	 	}
	 }
	}


	UtilityService.injectTasks();
	UtilityService.cleanOldTasks();
	UtilityService.addKind();

	

	$scope.viewDetails = function(){
		console.log("make a directive to show details")
	}

	$scope.deleteItem = function(item){
		if (item.category === 'Task'){
			deleteTask(item);
		} else {
			console.log("DELETE CONTACT/ APPT")
			deleteContact(item);
		} 
	}

	function deleteTask(item){
		console.log("item to delete", item._id)
		var taskId = item._id;
		var userId = item.user_id; 
		$http.post("/tasks/delete", {taskId: taskId}) 
		.then(function(res){
			console.log("RESPONSE FROM DELETE REQ", res.data);
			loadData();
		}, function(err){console.log(err)})
		//add sweet alert to confirm before deleting
	}	

	function deleteContact(item){
		console.log("item to delete", item._id)
		var contactId = item._id;
		var userId = item.user_id; 
		$http.post("/contacts/delete", {contactId: contactId}) 
		.then(function(res){
			console.log("RESPONSE FROM DELETE REQ", res.data);
			loadData();
		}, function(err){console.log(err)})
		//add sweet alert to confirm before deleting
	}




	// convert into mongoose
 	$rootScope.addBtns = [{name:'Task', classIs:'btn-info'}, 
 	{name:'Appointment', classIs:'btn-warning'}, 
 	{name:'Contact', classIs:'btn-success'}];

	$scope.addNew = function(button){
		console.log('addNew', button.name);
		if(button.name === $scope.addBtns[0].name){
			$rootScope.addThis = $scope.addBtns[0]
		} else if (button.name === $scope.addBtns[1].name){
			$rootScope.addThis = $scope.addBtns[1]
		} else if (button.name === $scope.addBtns[2].name){ 
			$rootScope.addThis = $scope.addBtns[2]
		}
	}

	$scope.striking = function(item){
		if(!item)return;
		if (item.completed === true){
			console.log("STRIKE ME DOWN")
			return 'strike';
		}
		return 'un-strike';
	}

	// $scope.striker = 'un-strike';
	$scope.checkOff = function(item){
		item.completed = !item.completed;
		if (item.completed){
			$timeout(function(){
			archive(item)}, 1000)
		} else {
			$timeout(function(){
			unArchive(item)}, 1000)
		}		
	}

	var archive = function(item){
		console.log(item, "ARCHIVING THIS GUY")
		$http.put("tasks/archive", {taskId: item._id}) 
		.then(function(res){
			console.log("RESPONSE FROM NEWARCHIVE REQ", res.data);
			UtilityService.setUserInfo();
		}, function(err){console.log(err)})			
	}
	 
		var unArchive = function(item){
		console.log(item, "UNARCHIVING THIS GUY")
		$http.put("tasks/unarchive", {taskId: item._id}) 
		.then(function(res){
			console.log("RESPONSE FROM UNARCHIVE REQ", res.data);
			UtilityService.setUserInfo();
		}, function(err){console.log(err)})			
	} 

	$scope.goToEdit = function(item){
		console.log("ITEM", item)
		$rootScope.editThis = item;
	  $state.go("main.edit");
	}

// sort
$scope.sortTasks = function(col){
	console.log("SORTA")
	var col = col;
		if(!$rootScope.myData){
		return;
		var reverseOrder;
	}
	if (col === "date"){
		$scope.sorted2 = !$scope.sorted2;
		col = 'completeBy';
		reverseOrder = $scope.sorted2 ? true : false;
	} else if(col === "name") {
		$scope.sorted = !$scope.sorted;
		col = 'task_name';
		reverseOrder = $scope.sorted ? true : false;
	}
	UtilityService.sortTasks($rootScope.tasks, col, reverseOrder);
}
})
