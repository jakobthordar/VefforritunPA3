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
		}

		$scope.addCourseQuestion = function() {
			$scope.evaluation.CourseQuestions.push({
				ID: $scope.evaluation.CourseQuestions.length,
				TextIS: "",
				TextEN: "",
				ImageURL: "",
				Type: "single",
				Answers: []
			});
		}
	}
])