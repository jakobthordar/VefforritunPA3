//Create the module 
var app = angular.module("EvaluationApp", ["ngRoute"]);

//This defines the routing throughout the app 
app.config(function($routeProvider) {
	$routeProvider.when("/home/", {
		templateUrl: "templates/home.html",
		controller: "HomeController"
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
	"$scope", "ApiFactory", "$routeParams",
	function($scope, ApiFactory, $routeParams) {
		var evaluationID = $routeParams.evaluationID;

		if(evaluationID !== undefined) {
			ApiFactory.getEvaluationById(evaluationID).then(function(data) {
				$scope.evaluation = data;
			}, function(errorMessage) {
				console.log("Error fetching evaluation: " + errorMessage);
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
	"$scope", "ApiFactory",
	function($scope, ApiFactory) {

		$scope.showButton = (function () {
			if (ApiFactory.getUser().Role == "admin") {
				return true; 
			}
			else {
				return false; 
			}
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
		$scope.login = {
			userName: "",
			password: ""
		};

		$scope.login = function(login) {
			console.log("Logged in");
			ApiFactory.login(login.user, login.pass).then(function(data) {
				//scope.user = data.User; 
				//$scope.token = data.Token; 
				console.log("THE TOKEN: " + ApiFactory.getToken());
				console.log("Logged in as " + ApiFactory.getUser().Role); 
				$location.path("/home/");
			}, function(errorMessage) {
				console.log("Could not log in."); 
			});
		};
	}
]); 
app.factory("ApiFactory", [
	"$q", "$timeout", "$http",
	function($q, $timeout, $http) {
		function createEvaluation(id, titleIS, titleEN, introIS, introEN) {
			return {
				ID: id,
				TitleIS: titleIS,
				TitleEN: titleEN,
				IntroTextIS: introIS,
				IntroTextEN: introEN,
				CourseQuestions: [],
				TeacherQuestions: []
			};
		}

		function createQuestion(id, textIS, textEN, imageUrl, type) {
			return {
				ID: id,
				TextIS: textIS,
				TextEN: textEN,
				ImageURL: imageUrl,
				Type: type,
				Answers: []
			};
		}

		function generateEvaluations() {
			var result = [];
			for(var i = 0; i < 5; ++i) {
				var number = i+1;
				var evaluation = createEvaluation(i, "Kennslumat " + number, "Evaluation " + number, "Derp", "Derp");
				for(var j = 0; j < 3; ++j) {
					var qNumber = j+1;
					var question = createQuestion(j, "Hvað er derp" + qNumber + "?", "What is derp " + qNumber + "?", "", "single");
					evaluation.CourseQuestions.push(question);
				}
				result.push(evaluation);
			}
			return result;
		}

		var evaluations = generateEvaluations();
		var serviceUrl = "http://project3api.haukurhaf.net/";
		var user = ""; 
		var token = ""; 

        /* We have access to these functions in our app */
		return {
			getAllEvaluations: function() {
				var deferred = $q.defer();

				var data = $http.get(serviceUrl + "api/v1/evaluations").
				success(function (data, status, headers, config) {
					deferred.resolve(data); 
				}).
				error(function(data, status, headers, config) {
					deferred.reject("Failed to get evaluations."); 
				}); 
			
				return deferred.promise;
			},
			getEvaluationById: function(id) {
				var deferred = $q.defer();

				if(evaluations[id]) {
					deferred.resolve(evaluations[id]);
				}
				else {
					deferred.reject("No evaluation with this id");
				}

				return deferred.promise;
			},
			addEvaluation: function(evaluation) {
				var deferred = $q.defer();

				

				return deferred.promise;
			},
			login: function(username, password) {
				var deferred = $q.defer(); 

				var data = $http.post(serviceUrl + "api/v1/login", {"user": username, "pass": password}).
				success(function (data, status, headers, config) { 
					$http.defaults.headers.common.Authorization = 'Basic ' + data.Token; 
					user = data.User; 
					token = data.Token; 
					deferred.resolve(data);
				}).
				error(function (data, status, headers, config) {
					deferred.reject("Failed to log in.");
				});

				return deferred.promise; 
			},
			newEvaluation: function(templateId, startDate, endDate) {
				var deferred = $q.defer(); 

				var data = $http.post(serviceUrl + "api/v1/evaluations", {"TemplateID": templateId, "StartDate": startDate, "EndDate": endDate}).
				success(function (data, status, headers, config) {
					deferred.resolve(data); 
				}).
				error(function (data, status, headers, config) {
					deferred.reject("Failed to submit evaluation"); 
				}); 

				return deferred.promise; 
			},
			newTemplate: function(id, titleIS, titleEN, introTextIS, introTextEN, courseQuestions) { 
				var deferred = $q.defer();

				var data = $http.post(serviceUrl + "api/v1/evaluationtemplates", 
					{"ID": id, "TitleIS": titleIS, "TitleEN": titleEN, "IntroTextIS": introTextIS, "IntroTextEN": introTextEN, "CourseQuestions": courseQuestions}).
				success(function (data, status, headers, config) {
					deferred.resolve(data); 
				}).
				error(function (data, status, headers, config) {
					deferred.reject("Failed to submit new template"); 
				}); 

				return deferred.promise; 
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
