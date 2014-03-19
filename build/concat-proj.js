//Create the module 
var app = angular.module("EvaluationApp", ["angles", "ui.bootstrap","ngRoute"]);

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
	}).when("/results", {
		templateUrl: "templates/results.html", 
		controller: "ResultsController"
	}).when("/", {
		templateUrl: "templates/login.html", 
		controller: "LoginController"
	}).otherwise({ redirectTo: "/"});
});

app.controller("EvaluationController", [
	"$scope", "ApiFactory", "$routeParams", "$location", 
	function($scope, ApiFactory, $routeParams, $location) {
		var evalID = $routeParams.evaluationID;
		$scope.evaluationTemplate = {
			ID: "",
			TitleIS: "", 
			TitleEN: "", 
			IntroTextIS: "", 
			IntroTextEN: "", 
			CourseQuestions: [], 
			TeacherQuestions: []
		};

		$scope.answers = [];
		$scope.hideError=true; 

        $scope.init = function(evaluationID) {
            if(evaluationID !== undefined) {
                ApiFactory.getEvaluationById(evaluationID).then(function(data) {
                    $scope.evaluation = data;
                    $scope.getTemplate($scope.evaluation);
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

        $scope.getTemplate = function(evaluation) {
			ApiFactory.getTemplateById(evaluation.TemplateID).then(function(data) {
				$scope.evaluationTemplate = data; 
				//pretty ghetto solution
				$scope.evaluationTemplate.CourseAnswers = [];
				for (var i = 0; i <  $scope.evaluationTemplate.CourseQuestions.length; i++) {
					$scope.evaluationTemplate.CourseAnswers.push({
						Question: $scope.evaluationTemplate.CourseQuestions[i].TextIS,
						ID: $scope.evaluationTemplate.CourseQuestions[i].ID, 
						Answer: ""
					});
				}
				$scope.evaluationTemplate.TeacherAnswers = []; 
				for (i = 0; i < $scope.evaluationTemplate.TeacherQuestions.length; i++) {
					$scope.evaluationTemplate.TeacherAnswers.push({
						Question: $scope.evaluationTemplate.TeacherQuestions[i].TextIS,
						ID: $scope.evaluationTemplate.TeacherQuestions[i].ID, 
						Answer: ""
					});
				}
			}, function(errorMessage) {
				console.log("failed to fetch template for evaluation " + errorMessage); 
			});
        };

        //New evaluation functions
		$scope.templates = []; 
		$scope.template = $scope.templates[0];
		
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
			$scope.startTime = date;
		};

		$scope.endTimeChanged = function(date) {
			$scope.endTime = date; 
		}; 

		/*$scope.startDateChanged = function(date) {

		}; 

		$scope.endDateChanged = function(date) {

		};*/

		//Timepicker variables
		$scope.hstep = 1; 
		$scope.mstep = 15; 
		/*$scope.opened = false; */
		$scope.startTime = ""; 
		$scope.endTime = ""; 
		/*//Datepicker functions and variables 
		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.showWeeks = true;
		$scope.toggleWeeks = function () {
			$scope.showWeeks = ! $scope.showWeeks;
		};

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = ( $scope.minDate ) ? null : new Date();
		};
		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			'year-format': "'yy'",
			'starting-day': 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
		$scope.format = $scope.formats[0];
*/
		$scope.submitEvaluation = function() {
			if ($scope.startTime === "") {
				$scope.startTime = new Date(); 
			}
			if ($scope.endTime === "") {
				$scope.endTime = new Date();
			}
			ApiFactory.newEvaluation($scope.template.ID, $scope.startTime, $scope.endTime); 
		};

		$scope.submitAnswers = function() {
			for (var i = 0; i < $scope.evaluationTemplate.TeacherAnswers.length; i++) {
				if ($scope.evaluationTemplate.TeacherAnswers[i].Answer === "") {
					$scope.hideError = false; 
					return; 
				}
			}
			for (i = 0; i < $scope.evaluationTemplate.CourseAnswers.length; i++) {
				if ($scope.evaluationTemplate.CourseAnswers[i].Answer === "") {
					$scope.hideError = false; 
					return; 
				}
			}
			retObjs = []; 
			for (i = 0; i < $scope.evaluationTemplate.TeacherAnswers.length; i++) {
				retObjs.push({
					QuestionID:  $scope.evaluationTemplate.TeacherAnswers.ID,
					TeacherSSN: null, 
					Value: $scope.evaluationTemplate.TeacherAnswers.Answer
				});
			}
			for (i = 0; i < $scope.evaluationTemplate.CourseAnswers.length; i++) {
				retObjs.push({
					QuestionID:  $scope.evaluationTemplate.CourseAnswers.ID,
					TeacherSSN: null, 
					Value: $scope.evaluationTemplate.CourseAnswers.Answer
				});
			}
			ApiFactory.saveAnswers('T-427-WEPO', null, $scope.evaluation.ID, retObjs).then(function(data) {
				console.log("success sending answers!");
			},
			function(errorMessage) {
				console.log("failed to send answers: " + errorMessage);
			});
		};

	}
]);

app.controller("HomeController", [
	"$scope", "ApiFactory", "$location",
	function($scope, ApiFactory, $location) {

        $scope.evaluations = [];
        $scope.courses = [];

		$scope.showButton = (function () {
            var user = ApiFactory.getUser();
            var isAdmin = false;
			if (user.Role === "admin") {
                isAdmin = true;
			}
            return isAdmin;
		});
        $scope.editEvaluation = (function() {
            $location.path("/evaluation/edit");
        });

        $scope.results = (function() {
            $location.path("/results");
        });

		$scope.newEval = (function(evaluation) {
			$location.path("/evaluation/new");
		}); 

		$scope.newTemplate = (function () {
			$location.path("/template/new"); 
		});

        $scope.getAllEvals = (function() {
            ApiFactory.getAllEvaluations().then(function(data) {
                $scope.evaluations = data;
                console.log(data);
            });
        });
        $scope.getMyCourses = (function() {
            ApiFactory.getMyCourses().then(function(data) {
                $scope.courses = data;
                console.log(data);
            });
        });
        this.init = (function() {
            $scope.getAllEvals();
            $scope.getMyCourses();
            /*ApiFactory.getEvaluationById(1).then(function(data) {
                console.log(data);
            });*/
        });
        this.init();

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

app.controller("ResultsController", [
    "$scope", "ApiFactory", "$location",
    function($scope, ApiFactory, $location) {
        //This is currently not in use
        $scope.chart = {
            labels : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            datasets : [
                {
                    fillColor : "rgba(151,187,205,0)",
                    strokeColor : "#e67e22",
                    pointColor : "rgba(151,187,205,0)",
                    pointStrokeColor : "#e67e22",
                    data : [4, 3, 5, 4, 6]
                },
                {
                    fillColor : "rgba(151,187,205,0)",
                    strokeColor : "#f1c40f",
                    pointColor : "rgba(151,187,205,0)",
                    pointStrokeColor : "#f1c40f",
                    data : [8, 3, 2, 5, 4]
                }
            ], 
        };
        $scope.data = {
            "ID": 1,
            "TemplateID": 2,
            "TemplateTitleIS": "sample string 3",
            "TemplateTitleEN": "sample string 4",
            "Courses": [
            {
                "ID": 1,
                "CourseID": "sample string 2",
                "Semester": "sample string 3",
                "CourseNameIS": "sample string 4",
                "CourseNameEN": "sample string 5",
                "Questions": [
                {
                    "QuestionID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "TeacherSSN": "sample string 4",
                    "Type": "sample string 5",
                    "TextResults": [
                        "sample string 1",
                        "sample string 2",
                        "sample string 3"
                    ],
                    "OptionsResults": [
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                },
                {
                    "QuestionID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "TeacherSSN": "sample string 4",
                    "Type": "sample string 5",
                    "TextResults": [
                        "sample string 1",
                    "sample string 2",
                    "sample string 3"
                        ],
                    "OptionsResults": [
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                },
                {
                    "QuestionID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "TeacherSSN": "sample string 4",
                    "Type": "sample string 5",
                    "TextResults": [
                        "sample string 1",
                    "sample string 2",
                    "sample string 3"
                        ],
                    "OptionsResults": [
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                }
                ]
            },
            {
                "ID": 1,
                "CourseID": "sample string 2",
                "Semester": "sample string 3",
                "CourseNameIS": "sample string 4",
                "CourseNameEN": "sample string 5",
                "Questions": [
                {
                    "QuestionID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "TeacherSSN": "sample string 4",
                    "Type": "sample string 5",
                    "TextResults": [
                        "sample string 1",
                    "sample string 2",
                    "sample string 3"
                        ],
                    "OptionsResults": [
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                },
                {
                    "QuestionID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "TeacherSSN": "sample string 4",
                    "Type": "sample string 5",
                    "TextResults": [
                        "sample string 1",
                    "sample string 2",
                    "sample string 3"
                        ],
                    "OptionsResults": [
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                },
                {
                    "QuestionID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "TeacherSSN": "sample string 4",
                    "Type": "sample string 5",
                    "TextResults": [
                        "sample string 1",
                    "sample string 2",
                    "sample string 3"
                        ],
                    "OptionsResults": [
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                }
                ]
            },
            {
                "ID": 1,
                "CourseID": "sample string 2",
                "Semester": "sample string 3",
                "CourseNameIS": "sample string 4",
                "CourseNameEN": "sample string 5",
                "Questions": [
                {
                    "QuestionID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "TeacherSSN": "sample string 4",
                    "Type": "sample string 5",
                    "TextResults": [
                        "sample string 1",
                    "sample string 2",
                    "sample string 3"
                        ],
                    "OptionsResults": [
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                },
                {
                    "QuestionID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "TeacherSSN": "sample string 4",
                    "Type": "sample string 5",
                    "TextResults": [
                        "sample string 1",
                    "sample string 2",
                    "sample string 3"
                        ],
                    "OptionsResults": [
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                },
                {
                    "QuestionID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "TeacherSSN": "sample string 4",
                    "Type": "sample string 5",
                    "TextResults": [
                        "sample string 1",
                    "sample string 2",
                    "sample string 3"
                        ],
                    "OptionsResults": [
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "sample string 2",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                }
                ]
            }
            ]
        };
    }
]); 

app.controller("TemplateController", [
	"$scope", "ApiFactory", "$routeParams", "$location", 
	function($scope, ApiFactory, $routeParams, $location) {

		$scope.init = function() {
			$scope.templateInfo = {}; 
			$scope.courseQuestions = []; 
			$scope.courseOptionQuestions = [];
			$scope.teacherQuestions = []; 
			$scope.teacherOptionQuestions = [];
			$scope.infoSubmitted = false; 
			$scope.hideQuestionForm = true; 
			$scope.hideQuestionForm = true; 
			$scope.noTeacherQuestions = true; 
			$scope.noCourseQuestions = true; 
			$scope.hideError = true; 
			$scope.typePromptToggle = true; 
			$scope.hideOptionButton=true;
			$scope.questionOptions = [];
			$scope.hideOptionEntry=true; 
			$scope.hideMultipleQuestionForm = true; 
			$scope.hideAddQuestionButton = false; 
			$scope.hideSubmitButton = true; 
			$scope.teacherOrCourse= ["Teacher", "Course"]; 
			$scope.typeSelection = $scope.teacherOrCourse[0];
		};
		$scope.submitQuestion = ( function(question) {
			var newQuestion = {
				TextIS: question.TextIS, 
				TextEN: question.TextEN, 
				ImageURL: question.ImageURL, 
				Type: "text"
			};
			if ($scope.typeSelection === "Teacher") {
				newQuestion.ID = $scope.teacherQuestions.length; 
				$scope.teacherQuestions.push(newQuestion);
				$scope.noTeacherQuestions = false; 
			}
			if ($scope.typeSelection === "Course") {
				newQuestion.ID = $scope.courseQuestions.length;
				$scope.courseQuestions.push(newQuestion);
				$scope.noCourseQuestions = false;
			}
			$scope.hideQuestionForm = true; 
			question.ID = ""; 
			question.TextIS = ""; 
			question.TextEN = ""; 
			question.ImageURL = ""; 
			question.Type = ""; 
		});
		/*$scope.submitTeacherQuestion = ( function(teacherQuestion) {
			$scope.teacherQuestions.push( {
				ID: $scope.teacherQuestions.length, 
				TextIS: teacherQuestion.TextIS, 
				TextEN: teacherQuestion.TextEN, 
				ImageURL: teacherQuestion.ImageURL, 
				Type: "text"
			});
			$scope.hideTeacherQuestionForm = true; 
			teacherQuestion.ID = ""; 
			teacherQuestion.TextIS = ""; 
			teacherQuestion.TextEN = ""; 
			teacherQuestion.ImageURL = ""; 
			teacherQuestion.Type = ""; 
			$scope.noTeacherQuestions = false; 
		});*/
		$scope.displayQuestionForm = ( function() {
			$scope.hideQuestionForm = false; 
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
		$scope.typePrompt = ( function() {
			$scope.typePromptToggle = !$scope.typePromptToggle; 
			$scope.hideAddQuestionButton = !$scope.hideAddQuestionButton;
		});
		$scope.addTextQuestion = ( function() {
			$scope.typePromptToggle = !$scope.typePromptToggle; 
			$scope.hideQuestionForm = !$scope.hideQuestionForm; 
		});
		$scope.addMultipleChoiceQuestion = ( function() {
			$scope.typePromptToggle = !$scope.typePromptToggle; 
			$scope.hideMultipleQuestionForm = !$scope.hideMultipleQuestionForm; 
		});
		$scope.addOption = (function() {
			if(!$scope.hideOptionButton) {
				$scope.hideOptionButton = true;
			}
			$scope.hideOptionEntry = !$scope.hideOptionEntry; 
		}); 
		$scope.optionSubmit = (function() {
			$scope.hideOptionEntry = !$scope.hideOptionEntry; 
			$scope.questionOptions.push({
				No: $scope.questionOptions.length + 1, 
				TextIS: $scope.optionEntryIS, 
				TextEN: $scope.optionEntryEN, 
				Weight: $scope.optionEntryWeight,
				ImageURL: $scope.optionEntryImageURL
			}); 
			$scope.optionEntryIS = "";
			$scope.optionEntryEN = "";
			$scope.optionEntryWeight = ""; 
			$scope.optionEntryImageURL = ""; 
			$scope.hideSubmitButton = false;
		});
		$scope.submitOptionQuestion = (function(optionQuestion) {
			var answers = [];
			for (var i = 0; i < $scope.questionOptions.length; i++) {
				answers.push({
					ID: i, 
					TextIS: $scope.questionOptions[i].TextIS, 
					TextEN: $scope.questionOptions[i].TextEN, 
					Weight: $scope.questionOptions[i].Weight,
					ImageURL: $scope.questionOptions[i].ImageURL
				});
			}
			$scope.questionOptions = [];
			var question = {
				TextIS: optionQuestion.TextIS, 
				TextEN: optionQuestion.TextEN, 
				ImageURL: optionQuestion.ImageURL, 
				Answers: answers,
				Type: "multi"
			};
			if ($scope.typeSelection === "Teacher") {
				question.ID = $scope.teacherOptionQuestions.length; 
				$scope.teacherOptionQuestions.push(question);
				console.log("Teacher option questions: " + $scope.teacherOptionQuestions.length);
				$scope.noTeacherQuestions = false; 
			}
			if ($scope.typeSelection === "Course") {
				question.ID = $scope.courseOptionQuestions.length;
				$scope.courseOptionQuestions.push(question);
				console.log("Course option questions: " + $scope.courseOptionQuestions.length);
				$scope.noCourseQuestions = false;
			}
			

			$scope.hideMultipleQuestionForm = true; 
			$scope.typePromptToggle = true;
			optionQuestion.ID = ""; 
			optionQuestion.TextIS = ""; 
			optionQuestion.TextEN = ""; 
			optionQuestion.ImageURL = ""; 
			optionQuestion.Type = ""; 
		});
		$scope.init();	
	}
]);

app.directive('myEvals', function() {
    return {
        restrict: 'E',
        controller: 'HomeController',
        templateUrl: 'templates/partials/myEvalsPartial.html',
    };
});

app.directive('myChart', function() {
    return {
        restrict: 'E',
        controller: 'ResultsController',
        templateUrl: 'templates/partials/myChartPartial.html',
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
