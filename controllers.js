angular.module("myApp")


//firebaseObject is a service that stores data that will be
//shared between the scope, the server (firebase) and the app
.controller("homeCtrl", function($scope, $firebaseObject, $firebaseAuth){
	$scope.user = {};
	var email = $scope.user.email;
	var password = $scope.user.password;

	var ref = new Firebase("https://dildaily.firebaseio.com");
	var syncObject = $firebaseObject(ref);
	var auth = $firebaseAuth(ref);

	//login existing user
	$scope.login = function(event){
		event.preventDefault();
		console.log("in login")

	auth.$authWithPassword({
		email: email,
		password: password
	}).then(function(user) {
    console.log('Authentication successful');
     }, function(error) {
     console.log('Authentication failure');
   	});
}

	$scope.fblogin =function(){
		  auth.$authWithOAuthPopup("facebook").then(function(authData) {
	    console.log("Logged in as:", authData.uid);
	  }).catch(function(error) {
	    console.log("Authentication failed:", error);
	  });
	}
})


.controller("registerCtrl", function($scope, $firebaseObject, $firebaseAuth){
	event.preventDefault();
	console.log("in register")

	$scope.user = {};
	var email = $scope.user.email;
	var password = $scope.user.password;

//create user account
$scope.createUser =function(event){
	var ref = new Firebase("https://dildaily.firebaseio.com");
	ref.createUser({
	  email    : email,
	  password : password
	}, function(error, userData) {
	  if (error) {
	    console.log("Error creating user:", error);
	  } else {
	    console.log("Successfully created user account with uid:", userData.uid);
	  }
	});
}

})

.controller("mainCtrl", function($scope, $localStorage){
	// $localStorage is equivalent to using local storage in conjunction with 
	// angular. 
	console.log("in main");
	$scope.title = "MAIN PAGE";

	$localStorage.todos = ["test1", "test2", "test3"];

	$scope.todos = $localStorage.todos;
})