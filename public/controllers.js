angular.module("myApp")

.controller("navCtrl", function($scope){

})

//firebaseObject is a service that stores data that will be
//shared between the scope, the server (firebase) and the app
.controller("AuthCtrl", function($scope, $state, $auth){
	console.log("in auth ctrl")

///// stuff for satelizer oauth login /////
	$scope.authenticate = function(provider){
		$auth.authenticate(provider)
			.then(function(res){
				console.log(res);
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
