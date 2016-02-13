"use strict";

angular.module("myApp")

.controller("mainCtrl", function($scope, $rootScope, $timeout, $state, UtilityService, $http, $log, $cookies){
	var cookies = $cookies.get('token');
	var satToken = localStorage.satellizer_token
	 if (!cookies && !satToken){
			$state.go("home");
			return;
	 } 

	$rootScope.category = $rootScope.category ? $rootScope.category :'Tasks';
  UtilityService.loadData();

//myData is set in Utility service
  $rootScope.$watch('myData', function(newData, oldData){
  	if ($rootScope.myData){	
  		console.log("LOADED DATAAAAA", newData);
  		updateView(newData);
  	}
  }) 

   $scope.$watch('rowData', function(newData, oldData){
  	if ($scope.rowData){	
  		console.log("NEW ROW DATA", newData);
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
	 if (!$scope.tHeads || $scope.currentView === 'Today'){
	 		console.log("TODAY", UtilityService.today);
	 } else if ($scope.currentView === 'This Week'){
	 		console.log("THIS WEEK", UtilityService.thisWeek);
	 } else if ($scope.currentView === 'Tasks'){
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
	 			tHeads.col4= "Date";
	 			tHeads.col5= "Time";
	 			tHeads.col6= "Edit/Delete";  
	 			$scope.r_1 = "contact_name";
	 			$scope.r_2 = "company_name";
	 			$scope.r_3 = "contact_method";
	 			$scope.r_4 = "next_appt_date";
	 			$scope.r_5 = "appointment_time";
	 			$scope.rowData = UtilityService.appointments;
	 			$scope.tHeads = tHeads;
	 		} else if ($scope.currentView === 'Contacts'){
	 			tHeads.col1= "Contact Name";
	 			tHeads.col2= "phone";
	 			tHeads.col3= "email"; 
	 			tHeads.col4= "next Contact Date";
	 			tHeads.col5= "Company";
	 			tHeads.col6= "Edit/Delete";  
	 			$scope.r_1 = "contact_name";
	 			$scope.r_2 = "contact_phn";
	 			$scope.r_3 = "contact_email";
	 			$scope.r_4 = "next_appt_date";
	 			$scope.r_5 = "company_name";
	 			$scope.rowData = UtilityService.contacts;
	 			$scope.tHeads = tHeads;
	 	} else if ($scope.currentView === 'Archives'){
	 			tHeads.col1= "Name";
	 			tHeads.col2= "Description/Company"; 
	 			tHeads.col3= "Frequency"; 
	 			tHeads.col4= "Complete By"; 
	 			tHeads.col5= "put back on agenda";
	 			tHeads.col6= "Edit/Delete"; 
	 			tHeads.col7= "un-archive";
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
		console.log("DELETE ITEM")
		if (item.category === 'todo'){
			deleteTask(item);
		} else {
			console.log("DELETE CONTACT/ APPT")
			deleteContact(item);
		} 
	}

	function deleteTask(item){
		var taskId = item._id;
		var userId = item.user_id; 
		$http.post("/tasks/delete", {taskId: taskId, userId: userId}) 
		.then(function(res){
			console.log("RESPONSE FROM DELETE REQ", res.data);
			UtilityService.loadData();
		}, function(err){console.log(err)})
		//add sweet alert to confirm before deleting
	}	

	function deleteContact(item){
		var removeWhich;
		var one = $scope.currentView;
		var both = one === 'Contacts' ? one + " and Appointments" : one + " and Contacts";
		one = "just " + one;
		swal({   title: "Where do you want to delete from",
		   text: "...",
		      type: "warning",   
		      showCancelButton: true,
		       confirmButtonColor: "#DD6B55",
		       // is confirm
		       confirmButtonText: one,
		       // else 
		       cancelButtonText: both,
		       closeOnConfirm: true,
		       closeOnCancel: true },
		       function(which){   
		       if (which) {    
		      	if (one.indexOf('Contacts') > -1){
		      		removeWhich = 'Contact'
		      	} else {
		      		removeWhich = 'Appointment'
		      	}
						console.log(removeWhich, item)
						postDelete(removeWhich, item)
		       //swal("Deleting Contact!", "This person will be removed.", "success");  
		       } else {  
		       removeWhich = 'both';  
		       //swal("Deleting Appointment", "This appointment will be removed", "success");
					console.log(removeWhich, item)
		      postDelete(removeWhich, item)
		        } 
			});
	}   
		      
		function postDelete(removeWhich, item){
			console.log("REMOVE WHICH 2", removeWhich)
			console.log("item to delete", item._id)
			var contactId = item._id;
			var userId = item.user_id; 
			$http.post("/contacts/delete", {contactId: contactId, userId: userId, removals: removeWhich}) 
			.then(function(res){
				console.log("RESPONSE FROM DELETE REQ", res.data);
				UtilityService.loadData();
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
			UtilityService.loadData();
		}, function(err){console.log(err)})			
	}
	 
		var unArchive = function(item){
		console.log(item, "UNARCHIVING THIS GUY")
		$http.put("tasks/unarchive", {taskId: item._id}) 
		.then(function(res){
			console.log("RESPONSE FROM UNARCHIVE REQ", res.data);
			UtilityService.loadData();
		}, function(err){console.log(err)})			
	} 

	$scope.goToEdit = function(item){
		console.log("ITEM", item)
		$rootScope.editThis = item;
	  $state.go("main.edit");
	}

// sort tasks or reverse order by column (col) clicked
$scope.sortTasks = function(col){
		if(!$rootScope.myData){
		return;
	}
	$scope.rowData = null;
	console.log("SORTA", col);
	console.log("CURRENT VIEW", $scope.currentView)
	var col = col;
	var sortData; 
	var reverseOrder;
	if ($scope.currentView === 'Tasks'){
		sortData = UtilityService.tasks;
	}
	if ($scope.currentView === 'Contacts'){
		sortData = UtilityService.contacts;;
	}
	 if ($scope.currentView === 'Appointments'){
		sortData = UtilityService.appointments;;
	} 	
	 if ($scope.currentView === 'Archives'){
		sortData = UtilityService.archives;;
	} 
	if (col === "date"){
		$scope.sorted2 = !$scope.sorted2;
		reverseOrder = $scope.sorted2 ? true : false;
			if ($scope.currentView === "Tasks"){
				col = 'completeBy';
			} else {
				col = 'next_appt_date';
			}
	} else if(col === "name") {
			$scope.sorted = !$scope.sorted;
			reverseOrder = $scope.sorted ? true : false;
			if ($scope.currentView === "Tasks"){
				col = 'task_name';
			} else if ($scope.currentView === "Tasks"){
				col = 'contact_name';
			} else if ($scope.currentView === "Companies"){
				col = 'company_name';
			}
	}
	$scope.rowData = UtilityService.sortTasks(sortData, col, reverseOrder);
}
})
