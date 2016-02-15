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



	var flashCards = [
	{question: "describe the concept of 'closure' in JS", answer:"Closures are functions that refer to independent (free) variables. In other words, the function defined in the closure 'remembers' the environment in which it was created.", cardLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" },
	{question: "what are some examples of useful ways to employ closures in JS", answer:"", cardLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" },
	{question: "describe the concept of 'prototypal inheritence' in JS", answer:"each datatype: objects, arrays, strings etc have certain characteristics and methods associated with them that make them unique from other data types, those behaviors and methods are inherited due to their prototype" , cardLinks: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain"},
	{question: "What is the difference between == and === ", answer:" == can equate string values with numberic values or any falsey value with another falsey value etc, while === describes a specific instance of something" },
	{question: "what is a RESTful API", answer: "", cardLink: "http://searchcloudstorage.techtarget.com/definition/RESTful-API"},
	{question: "explain how the internet works", answer: "", cardLink: "https://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm"}
	];

// let injectCards = (myId) =>{
// 	UtilityService.modifyTools('Flash Cards', flashCards, myId);
// } 

	let injectJobHunt = (myId)=>{
				var tasks = [
	{task_name: "5 tweets", 
	task_description: "use #, @  links to articles etcto get more attention", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "",
	category: "todo",
	completed: false,
	completion_date: null,
	user_id: myId},
	{task_name: "Linked In", 
	task_description: "send 35 connect requests", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "try to connect with CTOs, senior developers, recruiters etc",
	category: "todo",
	completed: false,
	completion_date: null,
	user_id: myId},
	{task_name: "Angel List", 
	task_description: "follow 10 companies", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "reach out to startups you're interested in",
	category: "todo",
	completed: false,
	completion_date: null,
	user_id: myId},
	{task_name: "Git Hub", 
	task_description: "keep punch-card green", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "commit frequently",
	category: "todo",
	completed: false,
	completion_date: null,
	user_id: myId},
	{task_name: "Quora and Stack Overflow", 
	task_description: "pose or answer a question", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "work with CH1 to exchange Q&A",
	category: "todo",
	completed: false,
	completion_date: null,
	user_id: myId},
	{task_name: "Apply to job postings", 
	task_description: "Apply to as many companies as you have time to thoroughly follow up with", 
	frequency: "daily", 
	completeBy: plusDay,
	additional_info: "",
	category: "todo",
	completed: false,
	completion_date: null,
	user_id: myId},
	{task_name: "Blog", 
	task_description: "write a blog entry about something you've used or learned", 
	frequency: "weekly", 
	completeBy: plusWeek,
	additional_info: "tweet it out give a mention to any companies mentioned, make sure to include pics and tags in post",
	category: "todo",
	completed: false,
	completion_date: null,
	user_id: myId}
	]
			$http.post("/tasks/userSetup", {inject: tasks, myId: myId, cards: flashCards})
			.then(function(res){
				console.log(res)
			}, function(err){
				console.log(err);
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
					injectCards(myId);
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
