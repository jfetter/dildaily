"use strict";

angular.module("myApp")

.controller("mainCtrl", function($scope, $rootScope, $timeout, $state, UtilityService, $http, $log){
	 if (!localStorage.satellizer_token){
			$state.go("home");
			return;
	 } 

	 $rootScope.category = $rootScope.category ? $rootScope.category :'Tasks';
  
  $rootScope.userData;
  function loadData(){	
  	var data; 
		$http.get(`users/login/${localStorage.dd_id}`)
			.then(function(res){
			console.log("RES BODY IN MAIN CTRL",  res.data)
			$rootScope.userData = res.data;
			$rootScope.myId = res.data._Id;
			$rootScope.myName = res.data.username;
			$rootScope.tasks = res.data.todos;
			data = res.data;
			updateView(data);
		}, function(err){ console.log(err)})
			return data;
  } 
  loadData();

  $rootScope.$watch('userData', function(newData, oldData){
  	console.log("LOADED DATA", newData);
  	updateView();
  })

  $rootScope.$watch('category', function(newCategory, oldCategory){
  	$scope.currentView = newCategory;
  	if ($rootScope.userData){	
  		updateView($rootScope.userData);
  	} else{
  		console.log("BANG USER DATA LALALALALALALAL")
  	}
  });

	 function updateView(data){
	 		if (!data){return}
	 		if ($scope.currentView == undefined){
	 			console.log("CATEGORY IS UNDEFINED")
	 			$scope.currentView = 'Tasks';
	 		}
	 		var contacts = data.contacts; 
	 		var tasks = [];
	 		var appointments =[];
	 		var archives = [];

	 		data.appointments.forEach(function(item){
	 			if (item.appointment_date < Date.now()){
	 				archives.push(item)
	 			} else {
	 				appointments.push(item)
	 			}
	 		})

	 		data.todos.forEach(function(item){
	 			if (item.completed === true || item.completeBy < Date.now()){
	 				archives.push(item)
	 			} else {
	 				tasks.push(item)
	 			}
	 		})
	 		

	 		console.log("DATA IN UPDATE VIEW", $rootScope.userData);
	 			 var tHeads = {};
	 			 var rowData = {}; 
	 if (!$scope.tHeads || $scope.currentView === 'Tasks'){
	 			//dataPool = $rootScope.tasks;
			 	tHeads.col1= "Task Name";
	 			tHeads.col2= "Description"; 
	 			tHeads.col3= "Frequency"; 
	 			tHeads.col4= "Complete By"; 
	 			tHeads.col5= "Edit/Delete"; 
	 			tHeads.col6= "Done?";
	 			tHeads.col7= "archive";
	 			//rowData.task_name = $rootScope.task.task_name;
	 			console.log('BANG THEADS');
	 			$scope.rowData = tasks;
	 			$scope.tHeads = tHeads;
	 } else{
	 		if ($scope.currentView === 'Appointments'){
	 			tHeads.col1= "Contact Name";
	 			tHeads.col2= "Company"; 
	 			tHeads.col3= "Contact Method"; 
	 			tHeads.col4= "Completion Date"; 
	 			tHeads.col5= "Edit/Delete"; 
	 			tHeads.col6= "Last follow up Date";
	 			tHeads.col7= "un-archive";
	 			$scope.tHeads = tHeads;
	 			$scope.rowData = appointments;
	 		} else if ($scope.currentView === 'Archives'){
	 			tHeads.col1= "Contact Name";
	 			tHeads.col2= "Company"; 
	 			tHeads.col3= "Contact Method"; 
	 			tHeads.col4= "Completion Date"; 
	 			tHeads.col5= "Edit/Delete"; 
	 			tHeads.col6= "Last follow up Date";
	 			tHeads.col7= "un-archive";
	 			$scope.tHeads = tHeads;
	 			$scope.rowData = archives;
	 			console.log("Archives");
	 	}
	 }
	}

	function injectTasks(tasks){
		console.log("need to test injection function");
		// tasks.forEach(function(task){
		// 	if (Date.now() > task.completeBy && nowTasks.indexOf(task) === -1){
		// 		nowTasks.push(task);
		// 	}
		// })
	}
	injectTasks();

	function cleanOldTasks(){
		console.log("make a function that will clean out old tasks... also set up a place for configuring that on the html")
	}
	cleanOldTasks();


	function addKind(){
		//var quitMessages["Are you sure; have you tried doing a kind thing?", "c'mon, deep down inside you know you think this is cute", "okay, fine, but try to do kind things on your own then"];
	 	var kindness = ["send a card or letter to a loved one", "leave a helium balloon outside a strangers house", "offer a snack to a homeless person", "compliment someone on something nice you notice about them", "do something good for an animal"];
		var selection = Math.floor(Math.random()*kindness.length);
		console.log("ADD KIND INDEX", selection);
		return kindness[selection];
	}
	

	$scope.viewDetails = function(){
		console.log("make a directive to show details")
	}

	$scope.deleteTask = function(item){
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

	// convert into mongoose
 

	//$localStorage.dailys = [{name: "test1", description: "descrip1", done: true }, {name: "test2", description: "descrip2", done: false }, {name: "kindness", description: addKind(), done: false}];
	//$scope.dailys = $localStorage.dailys;

	$scope.checkOff = function(item){
		item.completed = !item.completed;
		if (item.completed){
			$timeout(function(){
			archive(item)}, 1000)
		}
	}

	var archive = function(item){
		//var data = $rootScope.userData;
		// $rootScope.tasks.forEach(function(item){
			console.log(item, "ARCHIVING THIS GUY")
			//if (item.completed === true){
			//var newArchive = {};
			// newArchive.user_id = item.user_id;
			// newArchive.archive_name = item.task_name;
			// newArchive.descript = item.descript;
			// newArchive.additional_info = item.additional_info;
			// newArchive.completed = Date.now();
			// newArchive.category = 'todo';
			$http.put("tasks/archive", {taskId: item._id}) 
			.then(function(res){
				console.log("RESPONSE FROM NEWARCHIVE REQ", res.data);
				loadData();
			}, function(err){console.log(err)})
				
			}
		// })
	 

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
