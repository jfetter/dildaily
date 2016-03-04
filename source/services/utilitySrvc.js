"use strict";

angular.module("toWork")

.service("UtilityService", function($http, $state, $timeout, $rootScope, $cookies, jwtHelper){
	
	this.userData;
	$rootScope.myData;
	this.contacts = []
	this.tasks = [];
	this.appointments =[];
	this.Completed = [];
	this.companies = [];
	$rootScope.appTitle = "Get To Work";
	$rootScope.tagLine = "the agenda for job seekers"
	
	//var today = new Date().getDay();
	//var weekdays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	//$rootScope.today = weekdays[today]; 
	//There are only x more hours left today...
	$rootScope.hoursLeft = 24 - (new Date().getHours());



	this.thisweek = {};
 	this.today = {};
	var plusDay = new Date(Date.now() + (86400 * 1000));
	var minusDay = new Date (Date.now() - (86400 * 1000));
	var plusWeek = new Date(Date.now() + (86400 * 1000 * 7));
	var minusWeek = new Date(Date.now() - (86400 * 1000 * 7));

	let buildContacts = (newData) => {
		var contactData = newData.contacts; 
		var appointments = []; var contacts = [];
		var todayAppts = []; var todayFollowUps = []; var weekAppts = []; var weekFollowUps = [];
 		//after last item has been put into appropriate array trigger watched scope change
 		for (var i =0; i < contactData.length + 1; i ++){
 			var item = contactData[i];
 		if (i == contactData.length){
 			this.today.appointments = todayAppts;
 			this.today.followUps = todayFollowUps;
 			this.thisweek.appointments = weekAppts;
 			this.thisweek.followUps = weekFollowUps;
 			this.contacts = contacts;
 			this.appointments = appointments;
 			//in main ctrl, the change in rootScope.my data will trigger update view function 
 			// which will update the scope.
 			//buildDay(appointments, tasks, newData);
 			$rootScope.myData = newData;
 			return;
 		}
 		if (item.category === 'both'){
 			contacts.push(item);
 			appointments.push(item);
 			}
 		if (item.category === 'Contact'){
 			contacts.push(item);
 		} 
 		if (item.category === 'Appointment') {
 			appointments.push(item)
 		}
 		if (item.recurrence === 'daily') {
				item.next_appt_date = Date().now();
		}
		if (item.recurrence === 'weekly' && (new Date(item.next_appt_date) <= minusWeek)) {
				item.next_appt_date = plusWeek;
		}
 		if (new Date(item.next_appt_date) <= plusWeek){
			weekAppts.push(item);
		} if (new Date(item.followup_date) <= plusWeek){
			weekFollowUps.push(item);
		} 		
		if (new Date(item.next_appt_date) <= plusDay){
			todayAppts.push(item);
		} if (new Date(item.followup_date) <= plusDay){
			todayFollowUps.push(item);
		}
	}
}

 let buildTasks = (newData) =>{
 	console.log("MY DATA", newData)
 	var taskData = newData.todos;
	var todayTasks = [];var weekTasks = []; var tasks = []; var Completed = [];
		for (var i =0; i < taskData.length + 1; i ++){
			var item = taskData[i];
			//after done setting up Completed for tasks, build contacts
			// (do not know which build will finish first so must do them sequentially)
			if(i === taskData.length){
				this.today.tasks = todayTasks;
				this.thisweek.tasks = weekTasks;
				this.tasks = tasks;
				this.Completed = Completed;
				buildContacts(newData);
				return;		
			}
			// keep daily and weekly tasks in circulation unless they have been marked as complete
			if (item.frequency === 'daily' && new Date(item.completeBy) <= Date.now() ) {
				item.completeBy = plusDay;
				item.completion_date = null;
			}
			if (item.frequency === 'weekly' && new Date(item.completeBy) <= Date.now()) {
				item.completeBy = plusWeek;
				item.completion_date = null;
			}
			//add current tasks to weekly and daily view
				//console.log("complete by",new Date(item.completeBy), "plus day", plusDay, "completion date", item.completion_date )
			if (new Date(item.completeBy) <= plusDay && item.completion_date == null){
		 		todayTasks.push(item);
		 	}
		 	if (new Date(item.completeBy) <= plusWeek && item.completion_date == null){
		 		weekTasks.push(item);
		 	}
			if (item.completion_date != null){
				Completed.push(item);
			} else {
				tasks.push(item);
			}
		}
	}

	let	setUserInfo  = () =>{
		$http.get(`users/login/${$rootScope._myId}`)
			.then(res=>{
			var newData = res.data;
			$rootScope.flashCards = res.data.flash_cards;
			var newLinks = newData.social_media || {};
			var socialLinks = {};
			socialLinks.twitter = newLinks.twitter || "?";
			socialLinks.git = newLinks.git || "?";
			socialLinks.wordPress = newLinks.wordPress || "?";
			socialLinks.linkedin = newLinks.stackOverflow || "?";
			socialLinks.angellist = newLinks.angellist || "?";
			$rootScope.socialLinks= socialLinks;
			console.log("RES BODY IN SERVICE",  res.data)
			buildTasks(newData);
		}, function(err){ 
			console.error(err)
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

	this.findTask = function(item){
		console.log("GOING TO GO BACK AND GRAB", item)
	}

	this.archive = (item) =>{
		// on back end I assign complete date and complete by
		console.log(item, "ARCHIVING THIS GUY");
		$http.put("tasks/archive", item) 
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

	this.removeCookies = function(){
		var token = $cookies.get('token');
		$rootScope._myId = null;
		if(token){
		$cookies.remove('token')
		console.log("IN REMOVE COOKIES IF $rootScope._myId", $rootScope._myId);
	} else if (localStorage.satellizer_token){
		localStorage.clear();
		}
		//$state.go('home');
		document.location.reload(true);
	}

		this.cats = [ {name: "Today" }, 
		{name: "This Week" }, 
		{name: 'Appointments' }, 
		{name: 'Tasks' },
		{name: "Completed"}, 
		{name: "Contacts"}] 
		// {name: "Companies"}, 
		// {name: "All"} ];	

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

	this.addKind = function (){
 	var kindness = ["send a card or letter to a loved one", "leave a helium balloon outside a strangers house", "offer a snack to a homeless person", "compliment someone on something nice you notice about them", "do something good for an animal"];
	var selection = Math.floor(Math.random()*kindness.length);
	console.log("ADD KIND INDEX", selection);
	return kindness[selection];
}

})



