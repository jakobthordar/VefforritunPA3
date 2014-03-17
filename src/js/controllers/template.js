app.controller("TemplateController", [
	"$scope", "ApiFactory", "$routeParams", "$location", 
	function($scope, ApiFactory, $routeParams, $location) {

        $scope.init = function() {
			$scope.courseQuestions = []; 
			$scope.teacherQuestions = []; 
        };
        $scope.addCourseQuestion = (function () {
        	var newQuestion = {
        		ID: $scope.courseQuestions.length, 
        		TextIS: "Spurning " + $scope.courseQuestions.length,
        		TextEN: "Question " + $scope.courseQuestions.length, 
        		ImageUrl: "Image URL", 
        		Type: "Question type", 
        		Answers: []
        	}
        	$scope.courseQuestions.push(newQuestion); 
		});

        $scope.init();	
	}
]);
