"use strict";

angular.module("myApp")

.service("UtilityService", function($http, $timeout, $rootScope, $cookies, jwtHelper){
		this.userData;
		$rootScope.myData;
		this.contacts = []
 		this.tasks = [];
 		this.appointments =[];
 		this.archives = [];

//other names: Hire, get-it, Agen-do
	$rootScope.appTitle = "Get To Work";
	$rootScope.tagLine = "the agenda for job seekers"
	var today = new Date().getDay();
	var weekdays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	$rootScope.today = weekdays[today]; 
	//There are only x more hours left today...
	$rootScope.hoursLeft; 

	function loadData(){	
			var myData;
		$http.get(`users/login/${$rootScope._myId}`)
			.then(function(res){
			//$rootScope.userData = res.data;
			//$rootScope.myId = res.data._Id;
			//$rootScope.myName = res.data.username;
			//$rootScope.tasks = res.data.todos;
			myData = res.data;
			$rootScope.myData = myData;
			console.log("RES BODY IN SERVICE",  res.data)

			return myData;
		}, function(err){ 
			console.log(err)
			})
  } 


	var buildContacts = ( archs, tasks) => {
		var archives = archs; var contacts = []; var appointments = [];
		var contactData = $rootScope.myData.contacts;
 		for (var i =0; i < contactData.length + 1; i ++){
 			var item = contactData[i];
 		if (i == contactData.length){

 			this.archives = archives;
 			this.contacts = contacts;
 			this.tasks = tasks;
 			this.appointments = appointments;
 			console.log("MY CONTACTS ARE...", contacts)
 			loadData();
 			return;
 		}
 		if (item.category === 'Contact'){
 			contacts.push(item);
 		} else {
 		if (new Date(item.appointment_date) < Date.now()){
 			archives.push(item)
 		} else {
 			appointments.push(item)
 			}
 		}
		console.log("ITEM", item)
 	}
 		//$rootScope.myData 
}

 var buildTasks = () =>{
 	if (!$rootScope.myData)return;
 	var archs = []; var tasks = [];
 	var taskData = $rootScope.myData.todos;
	console.log("$rootScope.myData", taskData)
		for (var i =0; i < taskData.length + 1; i ++){
			var item = taskData[i];
			if(i === taskData.length){
				buildContacts(archs, tasks);
				return;		
			}
		if (item.completed === true || new Date(item.completeBy) < Date.now()){
			archs.push(item)
		} else {
			tasks.push(item)
		}
		console.log("ITEM", item)
	}
}
	this.setUserInfo = function(){
	 var token = $cookies.get('token');
	 if (!$rootScope.myData){
	 	if(token ){
	 	var allMyInfo = (jwtHelper.decodeToken(token))
		$rootScope._myId = allMyInfo._id;
	} else if (localStorage.satellizer_token){
		$rootScope._myId = localStorage.satellizer_token;
		}
	}
		$rootScope.myData = loadData();
		 $timeout( ()=>{
		console.log("ABOUT TO ITERATE THROUGH STUFF")
			buildTasks();
		 }, 25)
 		// seprate contacts from appointments from archives
		//buildFromContacts();
			//var data = this.userData.todos;
	// $rootScope.myData.todos.forEach(item=>{
	// console.log("FOR EACH TODO:", item)
	// 	if (item.completed === true || new Date(item.completeBy) < Date.now()){
	// 		this.archives.push(item)
	// 	} else {
	// 		this.tasks.push(item)
	// 	}
	// })

			//var data = this.userData.contacts;
 	// 	$rootScope.myData.contacts.forEach(item =>{
		// console.log("EACH CONTACT:", item)
 	// 	if (item.category === 'Contact'){
 	// 		this.contacts.push(item);
 	// 	} else {
 	// 	if (new Date(item.appointment_date) < Date.now()){
 	// 		this.archives.push(item)
 	// 	} else {
 	// 		this.appointments.push(item)
 	// 		}
 	// 	}
 	// })
 		// move completed or old tasks into archives;

	}

		this.injectTasks = function (tasks){
		console.log("need to test injection function");
		// tasks.forEach(function(task){
		// 	if (Date.now() > task.completeBy && nowTasks.indexOf(task) === -1){
		// 		nowTasks.push(task);
		// 	}
		// })
	}

	this.cleanOldTasks = function (){
		console.log("make a function that will clean out old tasks... also set up a place for configuring that on the html")
	}

		this.addKind = function (){
		//var quitMessages["Are you sure; have you tried doing a kind thing?", "c'mon, deep down inside you know you think this is cute", "okay, fine, but try to do kind things on your own then"];
	 	var kindness = ["send a card or letter to a loved one", "leave a helium balloon outside a strangers house", "offer a snack to a homeless person", "compliment someone on something nice you notice about them", "do something good for an animal"];
		var selection = Math.floor(Math.random()*kindness.length);
		console.log("ADD KIND INDEX", selection);
		return kindness[selection];
	}

	this.removeCookies = function(){
		var token = $cookies.get('token');
		if(token){
		$cookies.remove('token')
		$rootScope._myId = null;
		console.log("IN REMOVE COOKIES IF $rootScope._myId", $rootScope._myId);
	} else if (localStorage.satellizer_token){
		$rootScope._myId = localStorage.satellizer_token;
		}
	}

		this.cats = [ {name: "Today" }, 
		{name: "This Week" }, 
		{name: 'Appointments' }, 
		{name: 'Tasks' },
		{name: "Archives"}, 
		{name: "Contacts"}, 
		{name: "Companies"}, 
		{name: "All"} ];	

	this.console = function(){
		console.log("congrats you made it to the service")
	}

//this.allViews = ["Tasks", "Appointments", "Daily Schedule", "Weekly Scheudle", "Archives"]
//this.cat;
//prolly take this out of service 
// being used to hide and show login logout on nave ctrl
	this.loggedIn = function(){
		if ($rootScope._myId){
			return true;
		} return false; 
	}

this.loadUserData = function(){
	console.log("NEED TO SHIFT DATA GRABBING FROM MAIN CTRL TO SERVICE")
}


this.sortTasks = function(sortData, sortBy, reverseOrder){
		console.log("sortData2", sortData )
		console.log("sortBy", sortBy )
		console.log("zeroth", sortData[0][sortBy] )
	if (sortBy === "completeBy"){
		// $scope.sorted2 = !$scope.sorted2;
		sortData.sort(function(a,b){
			if (reverseOrder){
				return new Date(a[sortBy]) - new Date(b[sortBy]);
			}
  	return new Date(b[sortBy]) - new Date(a[sortBy]);
	});
	} else {
		// $scope.sorted = !$scope.sorted;
			sortData.sort(function(a,b){
				return b[sortBy].toLowerCase() > a[sortBy].toLowerCase()
			})
			if(reverseOrder){
				sortData.reverse();
			}
		}
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

