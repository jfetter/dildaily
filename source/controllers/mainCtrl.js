"use strict";

angular.module("myApp")

.controller("mainCtrl", function($scope, $q,  $rootScope, $state, UtilityService, $http, $uibModal, $log){
	 if (!localStorage.satellizer_token){
			$state.go("home");
			return;
	 } 

	 $rootScope.category = $rootScope.category ? $rootScope.category :'Tasks';



	 // $scope.$watch('tHeads', function(newHeads, oldHeads){
	 // 		console.log("NEW C IN MAIN", newcategory);
	 		
	 // 	if(newcategory == 'Archives'){
	 // 			tHeads.col1= "Task";
	 // 			tHeads.col2= "Description"; 
	 // 			tHeads.col3= "Frequency"; 
	 // 			tHeads.col4= "Complete By"; 
	 // 			tHeads.col5= "Edit/Delete"; 
	 // 			tHeads.col6= "Done?";
	 // 			tHeads.col7= "archive"; 
	 // 		$scope.tHeads = tHeads;
	 // 		console.log("NEW category", $scope.tHeads);
	 // 		}
	 // 	if (newcategory == 'Appointments'){
	 // 			tHeads.col1= "Contact Name";
	 // 			tHeads.col2= "Company"; 
	 // 			tHeads.col3= "Contact Method"; 
	 // 			tHeads.col4= "Completion Date"; 
	 // 			tHeads.col5= "Edit/Delete"; 
	 // 			tHeads.col6= "Last follow up Date";
	 // 			tHeads.col7= "un-archive";
	 // 		console.log("NEW category", $scope.tHeads);
	 // 	}
	 // })

	$scope.viewDetails = function(){
		console.log("make a directive to show details")
	}
  
  $rootScope.userData;
  function loadData(){	
  	var data; 
		$http.get(`users/login/${localStorage.dd_id}`)
			.then(function(res){
			console.log("RES BODY IN MAIN CTRL",  res.data)
			$rootScope.userData = res.data;
			data = res.data;
			updateView(data);
			$rootScope.tasks = res.data.todos;
		}, function(err){ console.log(err)})
			return data;
  } 
  loadData();

  $rootScope.$watch('userData', function(newData, oldData){
  	console.log("LOADED DATA", newData);
  	updateView();
  })

	 function updateView(data){
	 		if (!data){return}
	 		if ($rootScope.category == undefined){
	 			console.log("CATEGORY IS UNDEFINED")
	 			$rootScope.category = 'Tasks';
	 		}
	 		var tasks = data.todos;
	 		var appointments = data.appointments;
	 		var archives = data.archives;
	 		var contacts = data.contacts; 
	 		console.log("DATA IN UPDATE VIEW", $rootScope.userData);
	 			 var tHeads = {};
	 			 var rowData = {}; 
	 if (!$scope.tHeads){
	 			//dataPool = $rootScope.tasks;
			 	tHeads.col1= "Task Name";
	 			tHeads.col2= "Description"; 
	 			tHeads.col3= "Frequency"; 
	 			tHeads.col4= "Complete By"; 
	 			tHeads.col5= "Edit/Delete"; 
	 			tHeads.col6= "Done?";
	 			tHeads.col7= "archive";
	 			//rowData.task_name = $rootScope.task.task_name;
	 			$scope.rowData = tasks;
	 			$scope.tHeads = tHeads;
	 			console.log('row data', $scope.rowData);
	 			console.log("root tasks", $rootScope.tasks)
	 } else{
	 		if ($rootScope.category === 'Appointments'){
	 			tHeads.col1= "Contact Name";
	 			tHeads.col2= "Company"; 
	 			tHeads.col3= "Contact Method"; 
	 			tHeads.col4= "Completion Date"; 
	 			tHeads.col5= "Edit/Delete"; 
	 			tHeads.col6= "Last follow up Date";
	 			tHeads.col7= "un-archive";
	 			$scope.tHeads = tHeads;
	 			$scope.rowData = appointments;
	 		} else if ($rootScope.category === 'Archives'){
	 				 			tHeads.col1= "Contact Name";
	 			tHeads.col2= "Company"; 
	 			tHeads.col3= "Contact Method"; 
	 			tHeads.col4= "Completion Date"; 
	 			tHeads.col5= "Edit/Delete"; 
	 			tHeads.col6= "Last follow up Date";
	 			tHeads.col7= "un-archive";
	 			$scope.tHeads = tHeads;
	 			$scope.rowData = appointments;
	 			console.log("Archives");
	 	}
	 }
	}

	function injectTasks(){
		console.log("figure out a way to inject recurring tasks into todo list... and give them set due dates etc")
	}
	injectTasks();

	function cleanOldTasks(){
		console.log("make a function that will clean out old tasks... also set up a place for configuring that on the html")
	}
	cleanOldTasks();



	function addKind(){
	 	var kindness = ["send a card or letter to a loved one", "leave a helium balloon outside a strangers house", "offer a snack to a homeless person", "compliment someone on something nice you notice about them", "do something good for an animal"];
		var selection = Math.floor(Math.random()*kindness.length);
		console.log("ADD KIND INDEX", selection);
		return kindness[selection];
	}
	
	$scope.deleteTask = function(item){
		console.log("item to delete", item._id)
		var taskId = item._id;
		var userId = item.user_id; 
		$http.post("/tasks/delete", {taskId: taskId}) 
		.then(function(res){
			console.log("RESPONSE FROM DELETE REQ", res.data);
			loadUserTasks();
		}, function(err){console.log(err)})
		//add sweet alert to confirm before deleting

	}

	// convert into mongoose
 

	//$localStorage.dailys = [{name: "test1", description: "descrip1", done: true }, {name: "test2", description: "descrip2", done: false }, {name: "kindness", description: addKind(), done: false}];
	//$scope.dailys = $localStorage.dailys;

	$scope.checkOff = function(item){
		$scope.selected = item;
		console.log("from within checkOff item._id is", item._id); 			
	}

	$scope.archive = function(){
		console.log("send selected items to an array on the back end")
	}

	$scope.unarchive = function(){
		console.log("move an item from archive list back into todos")
	}

	$scope.goToEdit = function(item){
		console.log("ITEM", item)
		$rootScope.editThis = item;
	  $state.go("main.edit");
	}

// sort
$scope.sortTasks = function(col){
	var col = col;
		if(!$rootScope.tasks){
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
