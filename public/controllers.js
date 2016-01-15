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
		localStorage.removeItem("satellizer_token");
		localStorage.removeItem("dd_id");
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
//// end stuff for satellizer oauth /////


	//login with email and password
	$scope.login = function(provider){
	//prevent form from autosubmitting
		//event.preventDefault();
		console.log("in login")
		if (localStorage.statellizer_token){
			console.log("logged in")
			$state.go("main")
		}
	}
})

.controller("mainCtrl", function($scope, $rootScope, $localStorage, $state, UtilityService, $http){
	 if (!localStorage.satellizer_token)
		$state.go("home")
  
	$http.get(`users/login/${localStorage.dd_id}`)
		.then(function(res){
		console.log("RES BODY IN MAIN CTRL",  res.data.todos)
		$rootScope.tasks = res.data.todos;
	}, function(err){ console.log(err)})

	function addKind(){
	 	var kindness = ["send a card or letter to a loved one", "leave a helium balloon outside a strangers house", "offer a snack to a homeless person", "compliment someone on something nice you notice about them", "do something good for an animal"];
		var selection = Math.floor(Math.random()*kindness.length);
		console.log("ADD KIND INDEX", selection);
		return kindness[selection];
	}

	console.log("in main");
	$scope.title = "MAIN PAGE";

	$scope.addTask = function(){
		console.log("adding a new todo item")
	}

		$scope.editTask = function(item){
		console.log("item to edit", item)
	}

	$scope.deleteTask = function(item){
		console.log("item to delete",item.name)
		//add sweet alert to confirm before deleting
	}

	// convert into mongoose
 

	//$localStorage.dailys = [{name: "test1", description: "descrip1", done: true }, {name: "test2", description: "descrip2", done: false }, {name: "kindness", description: addKind(), done: false}];
	$scope.dailys = $localStorage.dailys;

	$scope.checkOff = function(item){
		$scope.selected = item;
		console.log("from within checkOff item.name is", item.name);
		// set up removal of item
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
	$http.post("/tasks/newtodo", task )
	.then(function(res){
		console.log("LOOK WHAT I BROUGHT BACK",res)
		$rootScope.tasks = [];
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
	function generateTaskId(){
	var task_id = Date.now() + Math.floor(Math.random()*100)
	console.log("task_id")
	return task_id;
	}
})

.controller("editCtrl", function($scope){
	$scope.test = "IN EDIT CTRL";
})
