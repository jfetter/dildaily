"use strict";

angular.module("myApp")

.directive("addTask",function){
	return{
		templateUrl: "templates/add.html"
	}
})

.directive('taskForm', function(){
  return{
    templateUrl: "templates/task-form.html"
  }
})
