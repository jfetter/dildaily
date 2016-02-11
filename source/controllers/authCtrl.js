"use strict";

angular.module("myApp")


.controller("AuthCtrl", function($scope, $rootScope, $state, $auth, $http, UtilityService){
	if ($rootScope._myId){
			$state.go("main");
			return;
	} 
///// stuff for satelizer oauth login /////

	$scope.authenticate = function(provider){
		$auth.authenticate(provider)
			.then(function(res){
				if (localStorage.satellizer_token){
					console.log(res.data, "logged in")
					///MONGOOSE USER ID EXTRACTED AND STORED ON ROOTSCOPE///
					//localStorage.dd_id = res.data.user;
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
	  userName: $scope.userName,
	  email: $scope.email,
	  password: $scope.password
	};

	if (user.password === password2){
		$http.post("auth/signup", user)
	  .then(function(res) {
	  	console.log(res)
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
		UtilityService.setUserInfo();
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
