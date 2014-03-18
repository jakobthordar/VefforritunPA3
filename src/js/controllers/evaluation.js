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
					$scope.evaluationTemplate.CourseAnswers.push("");
				}
				$scope.evaluationTemplate.TeacherAnswers = []; 
				for (i = 0; i < $scope.evaluationTemplate.TeacherQuestions.length; i++) {
					$scope.evaluationTemplate.TeacherAnswers.push("");
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
				if ($scope.evaluationTemplate.TeacherAnswers[i] === "") {
					$scope.hideError = false; 
					return; 
				}
			}
			for (i = 0; i < $scope.evaluationTemplate.CourseAnswers.length; i++) {
				if ($scope.evaluationTemplate.CourseAnswers[i] === "") {
					$scope.hideError = false; 
					return; 
				}
			}
			//Todo - submit to server
		};

	}
]);
