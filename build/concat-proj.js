//Create the module 
var app = angular.module("EvaluationApp", ["ui.bootstrap","ngRoute"]);

//This defines the routing throughout the app 
app.config(function($routeProvider, $provide, $httpProvider) {

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
		
		$scope.templates = []; 
		//$scope.template = ""; 
		//console.log($location.url()); 

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

            if ($location.url() == "/evaluation/new") {
				console.log("in new evaluation"); 
				ApiFactory.getAllTemplates().then(function(data) {
					$scope.templates = data; 
					$scope.template = data[0];
					$scope.startIsCollapsed = true; 
					$scope.endIsCollapsed = true;
				});
			}
			if ($location.url() == "/evaluation/") {
				console.log("in evaluation");
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

		$scope.startTimeChanged = function(date) {
		};
	}
]);

app.controller("HomeController", [
	"$scope", "ApiFactory", "$location",
	function($scope, ApiFactory, $location) {

        $scope.evaluations = [];
		$scope.showButton = (function () {
            var user = ApiFactory.getUser();
            var isAdmin = false;
			if (user.Role === "admin") {
                isAdmin = true;
			}
            return isAdmin;
		});

        $scope.editEvaluation = (function() {

        });

		$scope.newEval = (function(evaluation) {
            /*ar dummyEval = {
                "TemplateID": 0,
                "StartDate": "2014-03-17T15:28:40.2360731+00:00",
                "EndDate": "2014-03-17T15:28:40.2360731+00:00"
            };
            ApiFactory.addEvaluation(dummyEval).then(function(data) 
            {
                $scope.getAllEvals();
            });*/
			$location.path("/evaluation/new");
		}); 

		$scope.newTemplate = (function () {
			$location.path("/template/new"); 
		});

        $scope.getAllEvals = (function() {
            $scope.status = "Waiting...";
            ApiFactory.getAllEvaluations().then(function(data) {
                //console.log("Success, data: ", data);
                $scope.evaluations = data;
                $scope.status = "Success.";
            }, function(errorMessage) {
                //console.log("Error: " + errorMessage);
                $scope.status = "Error: " + errorMessage;
            });
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
                //console.log("THE TOKEN: " + ApiFactory.getToken());
                //Role is currently undefined as per tests
                //console.log("Logged in as " + ApiFactory.getUser().Role); 
                $location.path("/home/");
            }, function(errorMessage) {
                //console.log("Could not log in."); 
                $scope.errorMessage = "Could not log in.";
            });
        };
    }
]); 

app.controller("TemplateController", [
	"$scope", "ApiFactory", "$routeParams", "$location", 
	function($scope, ApiFactory, $routeParams, $location) {

		$scope.init = function() {
			$scope.templateInfo = {}; 
			$scope.courseQuestions = []; 
			$scope.teacherQuestions = []; 
			$scope.infoSubmitted = false; 
			$scope.hideQuestionForm = true; 
			$scope.hideTeacherQuestionForm = true; 
			$scope.noTeacherQuestions = true; 
			$scope.noCourseQuestions = true; 
			$scope.hideError = true; 
		};
		$scope.submitQuestion = ( function(question) {
			$scope.courseQuestions.push( {
				ID: $scope.courseQuestions.length,
				TextIS: question.TextIS, 
				TextEN: question.TextEN, 
				ImageURL: question.ImageURL, 
				Type: question.Type
			});
			$scope.hideQuestionForm = true; 
			question.ID = ""; 
			question.TextIS = ""; 
			question.TextEN = ""; 
			question.ImageURL = ""; 
			question.Type = ""; 
			$scope.noCourseQuestions = false;
		});
		$scope.submitTeacherQuestion = ( function(teacherQuestion) {
			$scope.teacherQuestions.push( {
				ID: $scope.teacherQuestions.length, 
				TextIS: teacherQuestion.TextIS, 
				TextEN: teacherQuestion.TextEN, 
				ImageURL: teacherQuestion.ImageURL, 
				Type: teacherQuestion.Type
			});
			$scope.hideTeacherQuestionForm = true; 
			teacherQuestion.ID = ""; 
			teacherQuestion.TextIS = ""; 
			teacherQuestion.TextEN = ""; 
			teacherQuestion.ImageURL = ""; 
			teacherQuestion.Type = ""; 
			$scope.noTeacherQuestions = false; 
		});
		$scope.displayQuestionForm = ( function() {
			$scope.hideQuestionForm = false; 
		});
		$scope.displayTeacherQuestionForm = ( function() {
			$scope.hideTeacherQuestionForm = false; 
		});
		$scope.submitTemplateInfo = ( function(templateInfo) {
			$scope.templateInfo = templateInfo;
			$scope.infoSubmitted = true; 
		});
		$scope.submitTemplate = ( function() {
			if ($scope.infoSubmitted && ($scope.courseQuestions.length + $scope.teacherQuestions.length > 0)) {
				var submitData = {
					ID: 42, //this don't matter
					TitleIS: $scope.templateInfo.TitleIS, 
					TitleEN: $scope.templateInfo.TitleEN, 
					IntroTextIS: $scope.templateInfo.IntroTextIS,
					IntroTextEN: $scope.templateInfo.IntroTextEN, 
					CourseQuestions: $scope.courseQuestions, 
					TeacherQuestions: $scope.teacherQuestions
				};
				ApiFactory.newTemplate(submitData);
			} 
			else {
				$scope.hideError = false; 
			}
		});
		$scope.init();	
	}
]);

app.directive('myPane', function() {
    return {
        require: '^myTabs',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        link: function(scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        templateUrl: 'my-pane.html'
    };
});

app.directive('myAllEvaluations', function() {
    return {
        restrict: 'E',
        transclude: true,
        require: '^homeController',
        scope: false,
        templateUrl: 'my-tabs.html',
        link: function(scope, element, attrs, homeCtrl) {

        },
    };
});

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
                    //console.log("Response from getAllEvaluations: " + response.data);
                    return response.data;
                });
				return promise;
			},
            getEvaluationById: function(id) {
				var promise = $http.get(serviceUrl + "api/v1/evaluations/" + id).then(function(response) {
                    //console.log(response);
                    return response.data;
                });

				return promise;
			},
            addEvaluation: function(evaluation) {
				var promise = $http.post(serviceUrl + "api/v1/evaluations", evaluation).then(function(response) {
                    console.log("Response: " + response);
                    console.log("Response data: " + response.data);
                    return response.data;
                });
                console.log("Promise: " + promise);

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
            newTemplate: function(templateObject) { 
				var promise = $http.post(serviceUrl + "api/v1/evaluationtemplates", templateObject).then(function(response){
                        return response.data;
                    }); 
				return promise; 
			},
            getAllTemplates: function() {
				var promise = $http.get(serviceUrl + "api/v1/evaluationtemplates").then(function(response) {
					return response.data; 
				});
				return promise;
			},
            getTemplateById: function(templateId) {
				var promise = $http.get(serviceUrl + "api/v1/evaluationtemplates/" + templateId).then(function(response) {
					return response.data; 
				});
				return promise; 
			},
            getMyCourses: function() {
				var promise = $http.get(serviceUrl + "api/v1/my/courses").then(function(response) {
					return response.data; 
				});
				return promise; 
            },
            getMyEvaluations: function() {
				var promise = $http.get(serviceUrl + "api/v1/my/evaluations").then(function(response) {
					return response.data; 
				});
				return promise; 
            },
            getCourseTeacher: function(course, semester) {
				var promise = $http.get(serviceUrl + "api/v1/courses/" + course + "/" + semester + "/teachers").then(function(response) {
					return response.data; 
				});
				return promise; 
            },
            getCourseEvaluation: function(course, semester, evalID) {
				var promise = $http.get(serviceUrl + "api/v1/courses/" + course + "/" + semester + "/evaluations/" + evalID).then(function(response) {
					return response.data; 
				});
				return promise; 
            },
            saveAnswers: function(course, semester, evalID, answers) {
				var promise = $http.post(serviceUrl + "api/v1/courses/" + course + "/" + semester + "/evaluations/" + evalID, answers).then(function(response) {
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
