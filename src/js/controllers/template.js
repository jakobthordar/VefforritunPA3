app.controller("TemplateController", [
	"$scope", "ApiFactory", "$routeParams", "$location", 
	function($scope, ApiFactory, $routeParams, $location) {

		$scope.init = function() {
			$scope.courseQuestions = []; 
			$scope.teacherQuestions = []; 
			$scope.hideQuestionForm = true; 
		};
		$scope.addCourseQuestion = (function () {
			var newQuestion = {
				ID: $scope.courseQuestions.length, 
				TextIS: "Spurning " + $scope.courseQuestions.length,
				TextEN: "Question " + $scope.courseQuestions.length, 
				ImageURL: "Image URL", 
				Type: "Question type", 
				Answers: []
			};
			$scope.courseQuestions.push(newQuestion); 
		});
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
		});

		$scope.displayQuestionForm = ( function() {
			$scope.hideQuestionForm = false; 
		});

		$scope.init();	
	}
]);
