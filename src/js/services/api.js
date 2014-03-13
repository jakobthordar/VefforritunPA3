app.factory("ApiFactory", [
	"$q", "$timeout", "$http",
	function($q, $timeout, $http) {
		function createEvaluation(id, titleIS, titleEN, introIS, introEN) {
			return {
				ID: id,
				TitleIS: titleIS,
				TitleEN: titleEN,
				IntroTextIS: introIS,
				IntroTextEN: introEN,
				CourseQuestions: [],
				TeacherQuestions: []
			};
		}

		function createQuestion(id, textIS, textEN, imageUrl, type) {
			return {
				ID: id,
				TextIS: textIS,
				TextEN: textEN,
				ImageURL: imageUrl,
				Type: type,
				Answers: []
			};
		}

		function generateEvaluations() {
			var result = [];
			for(var i = 0; i < 5; ++i) {
				var number = i+1;
				var evaluation = createEvaluation(i, "Kennslumat " + number, "Evaluation " + number, "Derp", "Derp");
				for(var j = 0; j < 3; ++j) {
					var qNumber = j+1;
					var question = createQuestion(j, "Hvað er derp" + qNumber + "?", "What is derp " + qNumber + "?", "", "single");
					evaluation.CourseQuestions.push(question);
				}
				result.push(evaluation);
			}
			return result;
		}

		var evaluations = generateEvaluations();
		var serviceUrl = "http://project3api.haukurhaf.net/";

        /* We have access to these functions in our app */
		return {
			getAllEvaluations: function() {
				var deferred = $q.defer();

				var data = $http.get(serviceUrl + "api/v1/evaluations").
				success(function (data, status, headers, config) {
					deferred.resolve(data); 
				}).
				error(function(data, status, headers, config) {
					deferred.reject("Failed to get evaluations."); 
				}); 
			
				return deferred.promise;
			},
			getEvaluationById: function(id) {
				var deferred = $q.defer();

				if(evaluations[id]) {
					deferred.resolve(evaluations[id]);
				}
				else {
					deferred.reject("No evaluation with this id");
				}

				return deferred.promise;
			},
			addEvaluation: function(evaluation) {
				var deferred = $q.defer();

				

				return deferred.promise;
			},
			login: function(username, password) {
				var deferred = $q.defer(); 

				var data = $http.post(serviceUrl + "api/v1/login", {"user": username, "pass": password}).
				success(function (data, status, headers, config) { 
					$http.defaults.headers.common.Authorization = 'Basic ' + data.Token; 
					deferred.resolve(data);
				}).
				error(function(data, status, headers, config) {
					deferred.reject("Failed to log in.");
				});

				return deferred.promise; 
			}
		};
	}
]);
