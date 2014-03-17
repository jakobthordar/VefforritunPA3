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
	}).
	when("/template/new", {
		templateUrl : "templates/newTemplate.html", 
		controller: "TemplateController"
	})
	.when("/evaluation/new", {
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

app.controller("EvaluationController", [
	"$scope", "ApiFactory", "$routeParams", "$location", 
	function($scope, ApiFactory, $routeParams, $location) {
		var evalID = $routeParams.evaluationID;
		
		//console.log($location.url()); 

		if ($location.url() == "/evaluation/new") {
			console.log("in new evaluation"); 
		}
		if ($location.url() == "/evaluation/") {
			console.log("in evaluation");
		}

        $scope.init = function(evaluationID) {
            if(evaluationID !== undefined) {
                ApiFactory.getEvaluationById(evaluationID).then(function(data) {
                    $scope.evaluation = data;
                }, function(errorMessage) {
                    console.log("Error fetching evaluation: " + errorMessage);
                    $scope.errorMessage = "Error fetching evaluation: " + errorMessage;
                });
            }
            else {
                $scope.evaluation = {
                    TitleIS: "",
                    TitleEN: "",
                    IntroTextIS: "",
                    IntroTextEN: "",
                    CourseQuestions: [],
                    TeacherQuestions: []
                };
            }
        };
        $scope.init(evalID);

		$scope.addAnswer = function(question) {
			question.Answers.push("New answer");
		};

		$scope.addCourseQuestion = function() {
			$scope.evaluation.CourseQuestions.push({
				ID: $scope.evaluation.CourseQuestions.length,
				TextIS: "",
				TextEN: "",
				ImageURL: "",
				Type: "single",
				Answers: []
			});
		};

		
	}
]);

app.controller("HomeController", [
	"$scope", "ApiFactory", "$location",
	function($scope, ApiFactory, $location) {

		$scope.showButton = (function () {
			if (ApiFactory.getUser().Role == "admin") {
				return true; 
			}
			else {
				return false; 
			}
		});

		$scope.newEvaluation = (function () {
			$location.path("/evaluation/new");
		}); 

		$scope.newTemplate = (function () {
			$location.path("/template/new"); 
		});

		ApiFactory.getAllEvaluations().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
	}
]);

app.controller("LoginController", [
    "$scope", "ApiFactory", "$location",
    function($scope, ApiFactory, $location) {
        //This is currently not in use
        $scope.loginCred = {
            userName: "",
password: ""
        };
        $scope.token = "";
        $scope.user = "";

        $scope.login = function(login) {
            ApiFactory.login(login.user, login.pass).then(function(data) {
                $scope.user = data.User; 
                $scope.token = data.Token; 
                console.log("THE TOKEN: " + ApiFactory.getToken());
                //Role is currently undefined as per tests
                //console.log("Logged in as " + ApiFactory.getUser().Role); 
                $location.path("/home/");
            }, function(errorMessage) {
                console.log("Could not log in."); 
                $scope.errorMessage = "Could not log in.";
            });
        };
    }
]); 

app.controller("TemplateController", [
	"$scope", "ApiFactory", "$routeParams", "$location", 
	function($scope, ApiFactory, $routeParams, $location) {

        $scope.init = function(evaluationID) {
            
        };

        //$scope.init(evalID);	
	}
]);

app.factory("ApiFactory", [
	"$q", "$timeout", "$http",
	function($q, $timeout, $http) {

		//var serviceUrl = "http://project3api.haukurhaf.net/";
		var serviceUrl = "http://dispatch.ru.is/H05/";
		var user = ""; 
		var token = ""; 

		return {
			getAllEvaluations: function() {
				var promise = $http.get(serviceUrl + "api/v1/evaluations").then(function(response) {
                    return response.data;
                });
				return promise;
			},
			getEvaluationById: function(id) {
				var promise = $http.get(serviceUrl + "api/v1/evaluations/" + id).then(function(response) {
                    return response.data;
                });

				return promise;
			},
			addEvaluation: function(evaluation) {
				var promise = $http.post(serviceUrl + "api/v1/evaluations", evaluation).then(function(response) {
                    return response.data;
                });

				return promise;
			},
			login: function(username, password) {
				var promise = $http.post(serviceUrl + "api/v1/login", {"user": username, "pass": password}).then(function(response) { 
					$http.defaults.headers.common.Authorization = 'Basic ' + response.data.Token; 
					user = response.data.User; 
					token = response.data.Token; 
                    return response.data;
				});
				return promise; 
			},
			newEvaluation: function(templateId, startDate, endDate) {
				var promise = $http.post(serviceUrl + "api/v1/evaluations", {"TemplateID": templateId, "StartDate": startDate, "EndDate": endDate}).then(function(response) {
                    return response.data;
				});
				return promise; 
			},
			newTemplate: function(id, titleIS, titleEN, introTextIS, introTextEN, courseQuestions) { 
				var promise = $http.post(serviceUrl + "api/v1/evaluationtemplates", {"ID": id, "TitleIS": titleIS, "TitleEN": titleEN, "IntroTextIS": introTextIS, "IntroTextEN": introTextEN, "CourseQuestions": courseQuestions}).then(function(response){
                        return response.data;
                    }); 
				return promise; 
			},
			getUser: function() {
				return user; 
			},
			getToken: function() {
				return token; 
			}
		};
	}
]);
