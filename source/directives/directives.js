"use strict";

angular.module("toWork")

.directive("right-view",function(){
	return{
		templateUrl: "templates/right-view.html"
	}
})

.directive('leftView', function(){
  return{
    templateUrl: "directives/left-view.html"
  }
})

.directive('taskForm', function(){
  return{
    templateUrl: "directives/task-form.html"
  }
})
  .directive('contactForm', function(){
  return{
    templateUrl: "directives/contact-form.html"
  }
})

.directive('mainTable', function(){
  return{
    templateUrl: "directives/main-table.html"
  }
})

// .directive('tools', function(){
//   return{
//     templateUrl: "directives/tools.html"
//   }
// })

// .directive('taskModal', function(){
//   return{
//     templateUrl: "partials/task-modal.html"
//   }
// })