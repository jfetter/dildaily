"use strict";

angular.module("myApp")


.controller("AuthCtrl", function($scope, $rootScope, $state, $auth, $http, UtilityService){
	if ($rootScope._myId){
			$state.go("main");
			return;
	} 

	//job hunting tasks to inject upon signup
	var plusWeek = Date.now() + (86400 * 1000 * 7);
	var plusDay = Date.now() + (86400 * 1000);

	var tasks = [
	{task_name: "5 tweets", 
	task_description: "use #, @  links to articles etcto get more attention", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "",
	category: "todo",
	completed: false,
	completion_date: null},
	{task_name: "Linked In", 
	task_description: "send 35 connect requests", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "try to connect with CTOs, senior developers, recruiters etc",
	category: "todo",
	completed: false,
	completion_date: null},
	{task_name: "Angel List", 
	task_description: "follow 10 companies", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "reach out to startups you're interested in",
	category: "todo",
	completed: false,
	completion_date: null},
	{task_name: "Git Hub", 
	task_description: "keep punch-card green", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "commit frequently",
	category: "todo",
	completed: false,
	completion_date: null},
	{task_name: "Quora and Stack Overflow", 
	task_description: "pose or answer a question", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "work with CH1 to exchange Q&A",
	category: "todo",
	completed: false,
	completion_date: null},
	{task_name: "Apply to job postings", 
	task_description: "Apply to as many companies as you have time to thoroughly follow up with", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "",
	category: "todo",
	completed: false,
	completion_date: null},
	{task_name: "Blog", 
	task_description: "write a blog entry about something you've used or learned", 
	frequency: "weekly", 
	completeBy: plusWeek,
	additional_info: "tweet it out give a mention to any companies mentioned, make sure to include pics and tags in post",
	category: "todo",
	completed: false,
	completion_date: null},
	]

	let injectJobHunt = (myId)=>{
		tasks.forEach(function(item){
			item.user_id = myId;
			$http.post("/tasks/newtodo", item)
			.then(function(res){
				console.log(res)
			}, function(err){
				console.log(err);
			})
		})
	}


///// stuff for satelizer oauth login /////

	$scope.authenticate = function(provider){
		$auth.authenticate(provider)
			.then(function(res){
				if (localStorage.satellizer_token){
					console.log(res.data, "logged in")
					///MONGOOSE USER ID EXTRACTED AND STORED ON ROOTSCOPE///
					//localStorage.dd_id = res.data.user;
					var myId = localStorage.satellizer_token;
					injectJobHunt(myId);
					UtilityService.loadData();
					$state.go("main");
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
	  username: $scope.userName,
	  email: $scope.email,
	  password: $scope.password
	};

	if (user.password === password2){
		$http.post("auth/signup", user)
	  .then(function(res) {
	  	var myId = res.data;
	  	console.log(res.data)
	  	injectJobHunt(myId);
	  	$state.go('home');
	  })
	  .catch(function(err) {
	  	swal({
   title: "email already used",
   text: "Please register a different email address!",
   type: "warning",
   showCancelButton: false,
   confirmButtonColor: "#DD6B55",
   confirmButtonText: "try again!",
   closeOnConfirm: true});
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
		console.log("RES AFTER LOGIN",res);
		//localStorage.setItem('satellizer_token', res.data.id)
		//localStorage.setItem('dd_id', res.data.id)
		UtilityService.loadData();
		$state.go('main')
	}).catch(function(err){
		swal({
   title: "invalid email or password",
   text: "Please try again!",
   type: "warning",
   showCancelButton: false,
   confirmButtonColor: "#DD6B55",
   confirmButtonText: "try again!",
   closeOnConfirm: true}); 
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
});
