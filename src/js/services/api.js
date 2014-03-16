app.factory("ApiFactory", [
	"$q", "$timeout", "$http",
	function($q, $timeout, $http) {

		//var serviceUrl = "http://project3api.haukurhaf.net/";
		var serviceUrl = "http://dispatch.ru.is/H05/";
		var user = ""; 
		var token = ""; 

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
					user = data.User; 
					token = data.Token; 
					deferred.resolve(data);
				}).
				error(function (data, status, headers, config) {
					deferred.reject("Failed to log in.");
				});
				return deferred.promise; 
			},
			newEvaluation: function(templateId, startDate, endDate) {
				var deferred = $q.defer(); 

				var data = $http.post(serviceUrl + "api/v1/evaluations", {"TemplateID": templateId, "StartDate": startDate, "EndDate": endDate}).
				success(function (data, status, headers, config) {
					deferred.resolve(data); 
				}).
				error(function (data, status, headers, config) {
					deferred.reject("Failed to submit evaluation"); 
				}); 

				return deferred.promise; 
			},
			newTemplate: function(id, titleIS, titleEN, introTextIS, introTextEN, courseQuestions) { 
				var deferred = $q.defer();

				var data = $http.post(serviceUrl + "api/v1/evaluationtemplates", 
					{"ID": id, "TitleIS": titleIS, "TitleEN": titleEN, "IntroTextIS": introTextIS, "IntroTextEN": introTextEN, "CourseQuestions": courseQuestions}).
				success(function (data, status, headers, config) {
					deferred.resolve(data); 
				}).
				error(function (data, status, headers, config) {
					deferred.reject("Failed to submit new template"); 
				}); 

				return deferred.promise; 
			},
			getUser: function() {
				return user; 
			},
			getToken: function() {
				return token; 
			}
		};
	}
]);
