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
	var kindness = ["send a card or letter to a loved one", "leave a helium balloon outside a strangers house", "offer a snack to a homeless person", "compliment someone on something nice you notice about them", "do something good for an animal"];

	function addKind(){
		var selected = Math.floor(Math.random()*kindness.length);
		console.log(selected);
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
	$localStorage.dailys = [{name: "test1", description: "descrip1", done: true }, {name: "test2", description: "descrip2", done: false }, {name: "kindness", description: addKind(), done: false}];
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

.controller("addCtrl", function($scope){
	$scope.test = "IN ADD CTRL";
})

.controller("editCtrl", function($scope){
	$scope.test = "IN EDIT CTRL";
})
