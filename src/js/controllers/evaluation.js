app.controller("EvaluationController", [
<<<<<<< HEAD
	"$scope", "ApiFactory", "$routeParams",
	function($scope, ApiFactory, $routeParams) {
		var evalID = $routeParams.evaluationID;
=======
	"$scope", "ApiFactory", "$routeParams", "$location", 
	function($scope, ApiFactory, $routeParams, $location) {
		
		console.log($location.url()); 

		if ($location.url() == "/evaluation/new") {

		}
		if ($location.url() == "/evaluation/") {
			
		}
		var evaluationID = $routeParams.evaluationID;
>>>>>>> cd1b89a91471232514c90d0881b9e7d74ebedca4

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
