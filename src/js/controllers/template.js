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
			if ($scope.infoSubmitted && ($scope.courseQuestions.length + $scope.teacherQuestions.length + $scope.teacherOptionQuestions.length + $scope.courseOptionQuestions.length > 0)) {
				var submitData = {
					ID: 42, //this don't matter
					TitleIS: $scope.templateInfo.TitleIS, 
					TitleEN: $scope.templateInfo.TitleEN, 
					IntroTextIS: $scope.templateInfo.IntroTextIS,
					IntroTextEN: $scope.templateInfo.IntroTextEN, 
					CourseQuestions: $scope.courseQuestions.concat($scope.courseOptionQuestions), 
					TeacherQuestions: $scope.teacherQuestions.concat($scope.teacherOptionQuestions)
				};
				ApiFactory.newTemplate(submitData);
				$location.path('/home/');

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
