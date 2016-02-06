"use strict";

angular.module("myApp")

.service("UtilityService", function($http, $rootScope){
	this.tasks = [];

	this.console = function(){
		console.log("congrats you made it to the service")
	}


//prolly take this out of service 
// being used to hide and show login logout on nave ctrl
	this.loggedIn = function(){
		if (localStorage.satellizer_token){
			$rootScope.loggedIn = true;
			return true;
		} 
		return false; 
	}
	
})

///authentication service using UI ROUTER AUTH STUFF
.service('AuthService',function ($http) {

  this.isAuthenticated = function (params) {
      if(typeof localStorage.token === 'undefined'){
        return false;    
      }else if(localStorage.token == null){
          return false;
      }else{
          return true;
      }
  }
});

