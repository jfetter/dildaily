"use strict";

angular.module("myApp")

.directive("dailyTasks",function){
	return{
		templateUrl: "directives/daily-tasks.html"
	}
})

.directive("weeklyTasks",function){
	return{
		templateUrl: "directives/weekly-tasks.html"
	}
})

.directive("otherTasks",function){
	return{
		templateUrl: "directives/other-tasks.html"
	}
})