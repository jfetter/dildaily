angular.module("myApp")

.controller("sampleCtrl", function($scope, $firebaseObject, $firebaseAuth, $firebaseArray){
//create new firebase instance	
var ref = new Firebase("https://dildaily.firebaseio.com");

//create a FB array to store messages. 
$scope.messages = $firebaseArray(ref);

//download and store the data from my firebase server in a local object 
// (obtaining the data is an asynch request) 
var syncObject = $firebaseObject(ref);

//bind the local object to the "data" model in the html and the scope
syncObject.$bindTo($scope, "data");

//you cannot directly manipulate a firebase array with methods like push
// and splice --because the data in the array can potentially be accessed by
// multiple users at once and therefore indicies may change unexpectedly
//instead
$scope.addMessage = function(){
	$scope.messages.$add({
		text: $scope.newMessageText
	})
}

})