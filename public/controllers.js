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


.controller("AuthCtrl", function($scope, $rootScope, $state, $auth, $http){

///// stuff for satelizer oauth login /////




	$scope.authenticate = function(provider){
		$auth.authenticate(provider)
			.then(function(res){
				if (localStorage.satellizer_token){
					console.log(res.data, "logged in")
					///MONGOOSE USER ID EXTRACTED AND STORED ON ROOTSCOPE///
					localStorage.dd_id = res.data.user;
					$state.go("main")
				} // if satellizer token in local storage
			})
			.catch(function(err){
				console.error(err);
			});
	};

///registesr with email and password


$scope.signup = function(){
	var password2 = $scope.password2; 
	var user = {
	  userName: $scope.userName,
	  email: $scope.email,
	  password: $scope.password
	};

	if (user.password === password2){
		console.log(user);
		$http.post("auth/signup", user)
	  .then(function(res) {
	  	console.log(res)
	  	$state.go('home');
	    // Redirect user here to login page or perhaps some other intermediate page
	    // that requires email address verification before any other part of the site
	    // can be accessed.
	  })
	  .catch(function(err) {
	    console.error(err);
	  });
	} else {
		console.log("passwords don't match")
	}
}

	$scope.pwlogin = function(){
		var user = {
	  email: $scope.logEmail,
	  password: $scope.logPassword
	};

$http.post('/auth/pwLogin', user)
	.then(function(res){
		console.log(res);
		localStorage.setItem('satellizer_token', res.data)
		$state.go('main')
	}).catch(function(err){
		console.error(err);
	});


}

	//oauth login
	$scope.login = function(provider){
		var user = {
	  userName: $scope.userName,
	  password: $scope.password
	};
	//prevent form from autosubmitting
		//event.preventDefault();
		console.log("in login")
		if (localStorage.statellizer_token){
			console.log("logged in")
			$state.go("main");
		}
	}
})

.controller("mainCtrl", function($scope, $rootScope, $state, UtilityService, $http, $uibModal, $log){
	 if (!localStorage.satellizer_token){
			$state.go("home");
	 }

	 $scope.title = "DILIGENCE";
  
  function loadUserTasks(){	
		$http.get(`users/login/${localStorage.dd_id}`)
			.then(function(res){
			console.log("RES BODY IN MAIN CTRL",  res.data.todos)
			$rootScope.tasks = res.data.todos;
		}, function(err){ console.log(err)})
  } 
//loadUserTasks();

	function addKind(){
	 	var kindness = ["send a card or letter to a loved one", "leave a helium balloon outside a strangers house", "offer a snack to a homeless person", "compliment someone on something nice you notice about them", "do something good for an animal"];
		var selection = Math.floor(Math.random()*kindness.length);
		console.log("ADD KIND INDEX", selection);
		return kindness[selection];
	}

	console.log("in main");

	$scope.addTask = function(){
		console.log("adding a new todo item")
	}

	$scope.openModal = function(item, size){
		$rootScope.item_id = item.item_id;
		$rootScope.user_id = item.user_item_id;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'templates/modal.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function() {
    	console.log("In modal function")

    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
	};

   $scope.editTask = function(){
    var taskId = $rootScope.item_id;
		var userId = $rootScope.item_user_id;
		console.log("item to edit", item)
		$http.put("/tasks/edit", {taskId: taskId})
		.then(function(res){
			console.log(res);
			loadUserTasks();
			}, function(err){console.log(err)})
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

 })

.controller("addCtrl", function($scope, $rootScope, $state, $http){
console.log("IN ADD CTRL"); 
$scope.todo = true; 

$scope.cancelAdd = function(){
	$state.go("main")
}

$scope.addAppt = function(){
	console.log("add meeting")
	$scope.todo = false; 
	//$state.go("main.add")
}


$scope.createNewTodo = function(){
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
},function(err){
		console.log(err);
	})
}

$scope.viewDetails =function(){
	console.log("figure out how to pull and displa")
}

$scope.createNewAppt = function(){
	console.log("create new appt")
}

/// create an id to add to task object
// 	function generateTaskId(){
// 	var task_id = Date.now() + Math.floor(Math.random()*100)
// 	console.log("task_id")
// 	return task_id;
// 	}
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

// $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
.controller('ModalInstanceCtrl', function($scope, $uibModalInstance) {
  // $scope.login = false;
  // $scope.register = false;
  // $scope.errors = false;

  // $scope.showError = function(err){
  // 	$scope.errors = true;
  //   $scope.errorMessages = err;
  // }

  // $scope.showLogin = function() {
  //   $scope.login = !$scope.login;
  //   $scope.register = false;
  // }

  // $scope.showReg = function() {
  //   $scope.register = !$scope.register;
  //   $scope.login = false;
  // }


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

