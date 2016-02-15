angular.module("myApp")

.controller("toolsCtrl", function($scope, $rootScope, $timeout, $state, UtilityService, $http, $log){
	console.log("make flash cards, contact list, company list, email templates etc...")
	
	$scope.cards = $rootScope.flashCards || [];
	$scope.socialLinks = UtilityService.socialLinks;
	$rootScope.toolBelt = $rootScope.toolBelt || "Flash Cards"

	$rootScope.$watch('flashCards', function(newData, oldData){
		console.log("new cards", newData);
		$scope.cards = newData;
	})

	$scope.showInputForm = function(){
		console.log("SHOW INPUT")
		$scope.addCards = true;
	}

	var modifyTools = function(){
		console.log("SENDING OFF CHANGES TOOLS", $rootScope.toolBelt);
		var toolType;
		var array; 
		if ($rootScope.toolBelt === "Flash Cards"){
			console.log("MODIFYING FLASH")
			toolType = "flash_cards"
			array = $scope.cards;
		} else if ($rootScope.toolBelt === "Social Media"){
			toolType = "social_media";
			array = $scope.SocialLinks;
		}
		UtilityService.modifyTools(toolType, array, $rootScope.myData._id)
	}

	$scope.addFlash = function(){
		$scope.addCards = true;
		$scope.playCards = false;

		var newCard = {};
		newCard.cardLink = $scope.cardLink;
		newCard.question = $scope.question;
		newCard.answer = $scope.answer;
		$scope.cards.push(newCard);
		$scope.question = "";
		$scope.answer = "";
		$scope.cardLink = "";
		modifyTools();
	}

	$scope.editMe = function(item, index){
		if ($scope.toolBelt == "Flash Cards"){
		console.log(item, "ITEMMM")
			$scope.question = item.question;
			$scope.answer = item.answer;
			$scope.cardLink = item.cardLink;
		} else if ($scope.toolBelt == "Social Media"){
		 	console.log("IN EDIT SOCIAL MEDIA")
		}
		$scope.deleteTool(index);
		$scope.addCards = true;
		$scope.addFlash	// 	$scope.deleteTool(index);	
	}

	var editTool = function(){
		
		var array;
		console.log("ITEM", item, "INDEX", index)
		if ($scope.toolBelt == "Flash Cards"){
			//index = $scope.cards.indexOf(item);
			array = $scope.cards;
		} else if ($scope.toolBelt === "Social Media"){
			//index = $scope.cards.indexOf(item);
			array = $scope.SocialLinks;
		}
		console.log("ARRAY BEFORE", array)
		array.splice(index, 1, item);
		console.log("ARRAY AFTER", array)
		modifyTools();
	}	

	$scope.deleteTool = function(index){
		var index;
		var array;
		if ($scope.toolBelt == "Flash Cards"){
			array = $scope.cards;
		} else if ($scope.toolBelt == "Social Media"){
			//index = $scope.cards.indexOf(item);
			array = $scope.SocialLinks;
		}
			console.log("ARRAY BEFORE", array)
			array.splice(index, 1);
			console.log("ARRAY AFTER", array)
			modifyTools();
	}

	$scope.quest = true;
	$scope.dealCard = function(){
		$scope.addCards = false;
		$scope.playCards = true;
		$scope.quest = true;
		$scope.showCard = nextQuestion();
	}

	var nextQuestion = function(){
		var cards = $scope.cards; 
		var index = Math.floor((Math.random()* cards.length));
		return cards[index];
	}

	$scope.links = [
	{name: "twitter",
	url: UtilityService.twitter || null},	
	{name: "gitHub",
	url: UtilityService.git || null},



	]; 


	// $scope.twitter = UtilityService.twitter;
	// $scope.git = UtilityService.git;
	// $scope.wordPress = UtilityService.wordPress;
	// $scope.linkedin = UtilityService.linkedin;
	// $scope.stackOverflow = UtilityService.stackOverflow;
	// $scope.angellist = UtilityService.angellist;



	$scope.addSocial = function(){

	}	

	$scope.removeSocial = function(){

	}

	$scope.closeTools = function(){
		console.log("CLOSE TOOLs")
		$scope.playCards = null;
		$scope.addCards= null;
		$rootScope.toolBelt = null;
		$state.go("home");
	}



})