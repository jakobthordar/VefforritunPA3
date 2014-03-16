//Create the module 
var app = angular.module("EvaluationApp", ["ngRoute"]);

//This defines the routing throughout the app 
app.config(function($routeProvider) {
	$routeProvider.when("/home/", {
		templateUrl: "templates/home.html",
		controller: "HomeController"
	}).when("/evaluation/new", {
		templateUrl: "templates/newEvaluation.html", 
		controller: "EvaluationController"
	}).when("/evaluation/:evaluationID", {
		//this is where the routeparams are created
		templateUrl: "templates/evaluation.html",
		controller: "EvaluationController"
	}).when("/evaluation/", {
		templateUrl: "templates/evaluation.html",
		controller: "EvaluationController"
	}).when("/", {
		templateUrl: "templates/login.html", 
		controller: "LoginController"
	}).otherwise({ redirectTo: "/"});
});
