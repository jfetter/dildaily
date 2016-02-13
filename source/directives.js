"use strict";

angular.module("myApp")

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
.directive('appointmentForm', function(){
  return{
    templateUrl: "directives/appointment-form.html"
  }
})

// .directive('taskModal', function(){
//   return{
//     templateUrl: "partials/task-modal.html"
//   }
// })