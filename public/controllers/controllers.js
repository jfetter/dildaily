"use strict";

angular.module("myApp")

.controller("navCtrl", function($scope, $state, UtilityService){
	// hide login or logout button
	$scope.loginButton = function(){
		return UtilityService.loggedIn();
	} 

	$scope.goToMyTasks =function(){
		console.log("my tasks button clicked")
		if (localStorage.satellizer_token){
			$state.go("main");
		} else {
			console.log("login or register modal coming soon")
		}
	}

	$scope.logOut = function(){
		console.log("log out clicked");
		//localStorage.removeItem("satellizer_token");
		//localStorage.removeItem("dd_id");
		localStorage.clear();
		$state.go('home');
	};
})



.controller("mainCtrl", function($scope, $rootScope, $state, UtilityService, $http, $uibModal, $log){
	 if (!localStorage.satellizer_token){
			$state.go("home");
			return;
	 } 

	 $scope.title = "DILIGENCE";

	$scope.viewDetails = function(){
		console.log("make a directive to show details")
	}
  
  function loadUserTasks(){	
		$http.get(`users/login/${localStorage.dd_id}`)
			.then(function(res){
			console.log("RES BODY IN MAIN CTRL",  res.data.todos)
			$rootScope.tasks = res.data.todos;
		}, function(err){ console.log(err)})
  } 
loadUserTasks();

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

	$scope.goToEdit = function(item){
		console.log("ITEM", item)
		$rootScope.editThis = item;
	  $state.go("main.edit");
	}

// sort
	$scope.sortTasks = function(col){
		//toggle up down carrots
		if(!$rootScope.tasks){
			return;
		}
		if (col === "date"){
			$scope.sorted2 = !$scope.sorted2;
			$rootScope.tasks.sort(function(a,b){
				if (!$scope.sorted2){
					return new Date(a.completeBy) - new Date(b.completeBy);
				}
	  	return new Date(b.completeBy) - new Date(a.completeBy);
		});
		} else if(col === "name") {
		console.log($rootScope.tasks[0])
			$scope.sorted = !$scope.sorted;
				$rootScope.tasks.sort(function(a,b){
					return b.task_name > a.task_name
				})
				if(!$scope.sorted){
					$rootScope.tasks.reverse();
				}
			}
		}
})

.controller("addCtrl", function($scope, $rootScope, $state, $http){
console.log("IN ADD CTRL"); 
$scope.todo = true; 
console.log($scope.addEdit);

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
		console.log("LOOK WHAT I BROUGHT BACK",res)
		$rootScope.tasks.push(task);
		$state.go('main')
},function(err){
		console.log(err);
	})
}

$scope.createNewAppt = function(){
	console.log("create new appt")
}

 })



.controller("modalCtrl", function($scope, $state, $uibModalInstance){

 $scope.animationsEnabled = true;

  // $scope.open = function(size) {

  //   var modalInstance = $uibModal.open({
  //     animation: $scope.animationsEnabled,
  //     templateUrl: 'template/modal.html',
  //     controller: 'ModalInstanceCtrl',
  //     size: size,
  //   });

  //   modalInstance.result.then(function() {

  //   }, function() {
  //     $log.info('Modal dismissed at: ' + new Date());
  //   });
  // };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})


