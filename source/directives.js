"use strict";

angular.module("myApp")

.directive("archive",function(){
	return{
		templateUrl: "templates/archive.html"
	}
})

.directive('leftView', function(){
  return{
    templateUrl: "directives/left-view.html"
  }
})
