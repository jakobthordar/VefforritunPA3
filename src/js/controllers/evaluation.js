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
