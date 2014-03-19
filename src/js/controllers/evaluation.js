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

		$scope.newEvaluation = function() {
			console.log("in new evaluation"); 
			ApiFactory.getAllTemplates().then(function(data) {
				$scope.templates = data; 
				$scope.template = data[0];
				$scope.startIsCollapsed = true; 
				$scope.endIsCollapsed = true;
			});
        };

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
				$scope.newEvaluation(); 
			}
        };
        $scope.init(evalID);

        $scope.getTemplate = function(evaluation) {
			ApiFactory.getTemplateById(evaluation.TemplateID).then(function(data) {
				$scope.getTemplateCallBack(data);
			}, function(errorMessage) {
				console.log("failed to fetch template for evaluation " + errorMessage); 
			});
        };

        $scope.getTemplateCallBack = function(data) {
			$scope.evaluationTemplate = data; 
			//pretty ghetto solution
			$scope.evaluationTemplate.CourseTextQuestions = [];
			$scope.evaluationTemplate.CourseMultiQuestions = []; 
			$scope.evaluationTemplate.TeacherTextQuestions = []; 
			$scope.evaluationTemplate.TeacherMultiQuestions = []; 
			
			var question = ""; 
			for (var i = 0; i <  $scope.evaluationTemplate.CourseQuestions.length; i++) {
				//if there are no answers, this is a text question
				question = {
					Question: $scope.evaluationTemplate.CourseQuestions[i].TextIS,
					ID: $scope.evaluationTemplate.CourseQuestions[i].ID, 
					Answer: "",
					Options: $scope.evaluationTemplate.CourseQuestions[i].Answers
				};
				if ($scope.evaluationTemplate.CourseQuestions[i].Answers.length === 0) {
					$scope.evaluationTemplate.CourseTextQuestions.push(question);
				} 
				else {
					question.Selected = question.Options[0]; 
					$scope.evaluationTemplate.CourseMultiQuestions.push(question);
				}
			}				
			for (i = 0; i < $scope.evaluationTemplate.TeacherQuestions.length; i++) {
				question = {
					Question: $scope.evaluationTemplate.TeacherQuestions[i].TextIS,
					ID: $scope.evaluationTemplate.TeacherQuestions[i].ID, 
					Answer: "",
					Options: $scope.evaluationTemplate.TeacherQuestions[i].Answers
				};
				if ($scope.evaluationTemplate.TeacherQuestions[i].Answers.length === 0) {
					$scope.evaluationTemplate.TeacherTextQuestions.push(question);
				}
				else {
					question.Selected = question.Options[0]; 
					$scope.evaluationTemplate.TeacherMultiQuestions.push(question);
				}
				
			}
			$scope.evaluationTemplate.CourseOptionAnswers = []; 
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
			$location.path('/home/');
		};

		$scope.submitAnswers = function() {
			//Check if any answers are empty
			for (var i = 0; i < $scope.evaluationTemplate.TeacherTextQuestions.length; i++) {
				if ($scope.evaluationTemplate.TeacherTextQuestions[i].Answer === "") {
					$scope.hideError = false; 
					return; 
				}
			}
			for (i = 0; i < $scope.evaluationTemplate.CourseTextQuestions.length; i++) {
				if ($scope.evaluationTemplate.CourseTextQuestions[i].Answer === "") {
					$scope.hideError = false; 
					return; 
				}
			}


			retObjs = []; 
			for (i = 0; i < $scope.evaluationTemplate.TeacherTextQuestions.length; i++) {
				retObjs.push({
					QuestionID:  $scope.evaluationTemplate.TeacherTextQuestions.ID,
					TeacherSSN: null, 
					Value: $scope.evaluationTemplate.TeacherTextQuestions.Answer
				});
			}
			for (i = 0; i < $scope.evaluationTemplate.CourseTextQuestions.length; i++) {
				retObjs.push({
					QuestionID:  $scope.evaluationTemplate.CourseTextQuestions.ID,
					TeacherSSN: null, 
					Value: $scope.evaluationTemplate.CourseTextQuestions.Answer
				});
			}
			for (i = 0; i < $scope.evaluationTemplate.TeacherMultiQuestions.length; i++) {
				retObjs.push({
					QuestionID: $scope.evaluationTemplate.TeacherMultiQuestions[i].ID,
					TeacherSSN: null, 
					Value: $scope.evaluationTemplate.TeacherMultiQuestions[i].Selected
				});
			}
			for (i = 0; i < $scope.evaluationTemplate.CourseMultiQuestions.length; i++) {
				retObjs.push({
					QuestionID: $scope.evaluationTemplate.CourseMultiQuestions[i].ID,
					TeacherSSN: null, 
					Value: $scope.evaluationTemplate.CourseMultiQuestions[i].Selected
				});
			}
			ApiFactory.saveAnswers('T-427-WEPO', null, $scope.evaluation.ID, retObjs).then(function(data) {
				console.log("success sending answers!");
				$location.path('/home/');
			},
			function(errorMessage) {
				console.log("failed to send answers: " + errorMessage);
			});
		};

	}
]);
