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
	/// if user is not logged in, kick them back to login page
	//if (!localStorage.satellizer_token)
		//$state.go("home")
  
  //get user ID and stored somewhere useable
  // access it every time they log in

	$http.get(`users/login/${localStorage.dd_id}`)
		.then(function(res){
		console.log("RES BODY IN MAIN CTRL",  res.body)
	})

	var kindness = ["send a card or letter to a loved one", "leave a helium balloon outside a strangers house", "offer a snack to a homeless person", "compliment someone on something nice you notice about them", "do something good for an animal"];

	function addKind(){
		var selected = Math.floor(Math.random()*kindness.length);
		console.log("ADD KIND INDEX", selected);
		return kindness[selected];
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

//details about why I used this http://jsfiddle.net/pkozlowski_opensource/WXJ3p/15/
// 	$scope.isSelected = function(item){
// 		// if (this.checked === true)
// 		console.log("$scope.selected", $scope.selected)
// 		return $scope.selected === item;
// 	}
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
  //$rootScope.todos = [];
	var task = {};
	$scope.todo = true;
	task.user_id = localStorage.dd_id;
	task.todo_name = $scope.task_name;
	task.todo_description = $scope.task_description;
	task.todo_frequency = $scope.task_frequency;
	task.todo_compelteBy = $scope.task_completeBy;
	task.todo_email_reminder = $scope.task_email_reminder;
	task.todo_additional_info = $scope.task_additional_info;
	//$rootScope.todos.push(task);
	$http.post("/tasks/newtodo", task )
	.then(function(res){
		console.log(res)
	}, function(err){
		console.log(err)
	})
}

$scope.createNewAppt = function(){
	console.log("create new appt")
}

/// create an id to add to task object
	function generageTaskId(){
	var task_id = Date.now() + Math.floor(Math.random()*100)
	console.log("task_id")
	return task_id;
	}
})

.controller("editCtrl", function($scope){
	$scope.test = "IN EDIT CTRL";
})
