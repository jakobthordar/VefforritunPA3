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
			if ($scope.infoSubmitted) {
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
