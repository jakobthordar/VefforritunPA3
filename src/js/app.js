//Create the module 
var app = angular.module("EvaluationApp", ["ngRoute"]);

//This defines the routing throughout the app 
app.config(function($routeProvider, $provide, $httpProvider) {

//    $provide.factory('MyHttpInterceptor', function ($q) {
//        return {
//            // On request success
//            request: function (config) {
//                // console.log(config); // Contains the data about the request before it is sent.
//
//                // Return the config or wrap it in a promise if blank.
//                return config || $q.when(config);
//            },
//
//            // On request failure
//            requestError: function (rejection) {
//                // console.log(rejection); // Contains the data about the error on the request.
//                // Return the promise rejection.
//                return $q.reject(rejection);
//            },
//
//            // On response success
//            response: function (response) {
//                // console.log(response); // Contains the data from the response.
//                // Return the response or promise.
//                return response || $q.when(response);
//            },
//
//            // On response failture
//            responseError: function (rejection) {
//                // console.log(rejection); // Contains the data about the error.
//                // Return the promise rejection.
//                return $q.reject(rejection);
//            }
//        };
//    });
// 
//// Add the interceptor to the $httpProvider.
//$httpProvider.interceptors.push('MyHttpInterceptor');

    
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
