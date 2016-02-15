"use strict";

angular.module("myApp")

.service("UtilityService", function($http, $state, $timeout, $rootScope, $cookies, jwtHelper){
		this.userData;
		$rootScope.myData;
		this.contacts = []
 		this.tasks = [];
 		this.appointments =[];
 		this.archives = [];
 		this.companies = [];
 		this.today = {};
 		this.thisweek = {};
 		this.socialLinks = {};
 		
 		var plusDay = (Date.now() + (86400 * 1000));
		var minusDay = (Date.now() - (86400 * 1000));

	this.modifyTools = (toolType, array, id) =>{
		console.log(`IN MODIFY ${toolType} for ${id} sending ${array}`)
		var newArray = {}; 
		newArray.array = array;
		newArray.toolType = toolType;
		newArray.modify = {toolType: array}
		newArray.userId = id;
		console.log(newArray)
		$http.post("users/tools/update", newArray)
		.then(res=>{
			console.log("res.data", res.data);
			//$rootScope.flashCards = res.data.flash_cards;
			//$rootScope.socialLinks = res.data.social_media;
		},err=>{
			console.log(err);
		})

	}

	this.archive = (item) =>{
		console.log(item, "ARCHIVING THIS GUY")
		$http.put("tasks/archive", {taskId: item._id}) 
		.then((res) =>{
			console.log("RESPONSE FROM NEWARCHIVE REQ", res.data);
			this.loadData();
		}, (err)=>{console.log(err)
		})			
	}
	 
	this.unArchive = (item)=>{
		console.log(item, "UNARCHIVING THIS GUY")
		$http.put("tasks/unarchive", {taskId: item._id}) 
		.then((res)=>{
			console.log("RESPONSE FROM UNARCHIVE REQ", res.data);
			this.loadData();
		}, (err)=>{console.log(err)})			
	} 

	$rootScope.appTitle = "Get To Work";
	$rootScope.tagLine = "the agenda for job seekers"
	var today = new Date().getDay();
	var weekdays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	$rootScope.today = weekdays[today]; 
	//There are only x more hours left today...
	$rootScope.hoursLeft = 24 - (new Date().getHours());

	let buildTools = () =>{

	}

	let buildWeek = (appointments, tasks, newData)=>{
		var weekTasks = []; var weekAppts = []; var weekFollowUps = [];
			for (var h = 0; h < tasks.length + 1; h ++){
		 		if (h === tasks.length ){
		 			this.thisweek.tasks = weekTasks;
		 			//	console.log("this.today", this.today)
		 		} else {
					//console.log("H", h)
		 			var item = tasks[h];
		 			//console.log(item, "ITEM")
		 			if (new Date(item.completeBy) <= new Date(plusDay * 7) && new Date(item.completeBy) >= minusDay || item.frequency === 'daily' || item.frequency === 'weekly'){
		 				weekTasks.push(item);
		 			}
				}

		 	for (var i =0; i < appointments.length + 1; i ++){
		 			var item = appointments[i];
		 		if (i === appointments.length ){
		 				this.thisweek.appointments = weekAppts;
		 				this.thisweek.followUps = weekFollowUps;
		 		} else{
			 		if (new Date(item.next_appt_date) <= new Date(plusDay * 7)){
			 				weekAppts.push(item);
			 		} else if (new Date(item.followup_date) <= new Date (plusDay * 7)){
			 			weekFollowUps.push(item);
			 		}
				}
		 	}
			 	if (this.thisweek.tasks && this.thisweek.appointments && this.thisweek.followUps){
			 		console.log(this.thisweek, "THIS WEEK")
			 		$rootScope.myData = newData;
			 	}
		 	}
	}


	let buildDay = (appointments, tasks, newData) =>{
			 		//console.log("APPOINTMENTS", appointments, "TASKS", tasks)
				//var appTasks = UtilityService.appointments.concat(UtilityService.tasks);
		var todayTasks = []; var todayAppts = []; var todayFollowUps = []; 
		// 86400000 milliseconds in one day

			for (var h = 0; h < tasks.length + 1; h ++){
		 		if (h === tasks.length ){
		 			this.today.tasks = todayTasks;
		 			//	console.log("this.today", this.today)
		 		} else {
					//console.log("H", h)
		 			var item = tasks[h];
		 			//console.log(item, "ITEM")
		 			if (new Date(item.completeBy) <= plusDay && new Date(item.completeBy) >= minusDay || item.frequency === 'daily' || item.frequency === 'weekly'){
		 				todayTasks.push(item);
		 			}
				}

		 	for (var i =0; i < appointments.length + 1; i ++){
		 			var item = appointments[i];
		 		if (i === appointments.length ){
		 				this.today.appointments = todayAppts;
		 				this.today.followUps = todayFollowUps;
		 		} else{
			 		if (new Date(item.next_appt_date) <= plusDay){
			 				todayAppts.push(item);
			 		} else if (new Date(item.followup_date) <= plusDay){
			 			todayFollowUps.push(item);
			 		}
				}
		 	}
			 	if (this.today.tasks && this.today.appointments && this.today.followUps){
			 		console.log(this.today, "TODAYYY")
			 		$rootScope.myData = newData;
			 		buildWeek(appointments, tasks, newData);
			 	}
		 	}
		}

	let buildContacts = ( newData, archs, tasks) => {
		var archives = archs; var contacts = []; var appointments = [];
		var contactData = newData.contacts;
 		for (var i =0; i < contactData.length + 1; i ++){
 			var item = contactData[i];
 		if (i == contactData.length){
 			this.archives = archives;
 			this.contacts = contacts;
 			this.tasks = tasks;
 			this.appointments = appointments;
 			console.log("MY CONTACTS ARE...", contacts)
 			//$rootScope.myData = newData;
 			buildDay(appointments, tasks, newData);
 			//buildWeek(tasks, appointments);
 			return;
 		}
 		if (item.category === 'both'){
 				contacts.push(item);
 				appointments.push(item);
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
		//console.log("ITEM", item)
 	}
 		//$rootScope.myData 
}

 let buildTasks = (newData) =>{
 	console.log("MY DATA", newData)
 	var archs = []; var tasks = [];
 	var taskData = newData.todos;
		for (var i =0; i < taskData.length + 1; i ++){
			var item = taskData[i];
			if(i === taskData.length){
				buildContacts(newData, archs, tasks);
				return;		
			}
			// put daily tasks back into circulation after a day and weekly after a week
		if ((item.completed === true && item.frequency === 'daily' && new Date(item.completion_date) >= Date.now() ) ||
			 (item.completed === true && item.frequency === 'weekly' && new Date(item.completion_date) >= Date.now() + (7 * plusDay)) ){
			this.unarchive(item);
			item.push(tasks)
		} else if (item.completed === true ){
		//|| new Date(item.completeBy) < Date.now()
			archs.push(item)
		}else {
			tasks.push(item)
		}
		//console.log("ITEM", item)
	}
}



	let	setUserInfo  = () =>{
		console.log("$rootScope._myId", $rootScope._myId)
		$http.get(`users/login/${$rootScope._myId}`)
			.then(res=>{
			//$rootScope.userData = res.data;
			//$rootScope.myId = res.data._Id;
			//$rootScope.myName = res.data.username;
			//$rootScope.tasks = res.data.todos;
			//$rootScope.myData = myData;
			var newData = res.data;
			var newLinks = newData.social_media || {};
			$rootScope.flashCards = res.data.flash_cards;
			var socialLinks = {};
			socialLinks.twitter = newLinks.twitter || "?";
			socialLinks.git = newLinks.git || "?";
			socialLinks.wordPress = newLinks.wordPress || "?";
			socialLinks.linkedin = newLinks.stackOverflow || "?";
			socialLinks.angellist = newLinks.angellist || "?";
			$rootScope.socialLinks= socialLinks;
			console.log("RES BODY IN SERVICE",  res.data)
			console.log("ABOUT TO ITERATE THROUGH STUFF")
			buildTasks(newData);
		}, function(err){ 
			console.log(err)
			})
  }

this.loadData = () => {
	 var token = $cookies.get('token');
	 if (!$rootScope.myData){
	 	if(token ){
	 	var allMyInfo = (jwtHelper.decodeToken(token))
		$rootScope._myId = allMyInfo._id;
	} else if (localStorage.satellizer_token){
		$rootScope._myId = localStorage.satellizer_token;
		}
	}
		setUserInfo();
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

$rootScope.closePopUp = function(){
	$rootScope.addThis = null;
	$rootScope.editThis = null;
	$state.go('main');
}

this.sortTasks = (sortData, sortBy, reverseOrder) =>{
		console.log("sortData2", sortData )
		console.log("sortBy", sortBy )
		console.log("reverseOrder", reverseOrder)
		console.log("zeroth", sortData[0][sortBy] )
	if (sortBy === "completeBy" || "appointment_date"){
		sortData.sort(function(a,b){
			if (reverseOrder){
				return new Date(a[sortBy]) - new Date(b[sortBy]);
			}
  	return new Date(b[sortBy]) - new Date(a[sortBy]);
	});
	} else {
			sortData.sort(function(a,b){
				 b[sortBy].toLowerCase() > a[sortBy].toLowerCase();
			})
			if(reverseOrder){
				 sortData.reverse();
			}
		}
	return sortData;
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

