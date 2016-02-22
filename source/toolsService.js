"use strict";

angular.module("toWork")

.service("ToolsService", function($http, $state, $timeout, $rootScope, $cookies, jwtHelper){

	this.toolsArray = ["", "Flash Cards"];
	this.selectedTools;
	this.socialLinks = {};

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
	},err=>{
		console.log(err);
	})
}




});