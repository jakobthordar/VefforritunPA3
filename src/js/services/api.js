app.factory("ApiFactory", [
	"$q", "$timeout", "$http",
	function($q, $timeout, $http) {

		//var serviceUrl = "http://project3api.haukurhaf.net/";
		var serviceUrl = "http://dispatch.ru.is/H05/";
		var user = ""; 
		var token = ""; 

		return {
			getAllEvaluations: function() {
				var promise = $http.get(serviceUrl + "api/v1/evaluations").then(function(response) {
                    return response.data;
                });
				return promise;
			},
			getEvaluationById: function(id) {
				var promise = $http.get(serviceUrl + "api/v1/evaluations/" + id).then(function(response) {
                    return response.data;
                });

				return promise;
			},
			addEvaluation: function(evaluation) {
				var promise = $http.post(serviceUrl + "api/v1/evaluations", evaluation).then(function(response) {
                    return response.data;
                });

				return promise;
			},
			login: function(username, password) {
				var promise = $http.post(serviceUrl + "api/v1/login", {"user": username, "pass": password}).then(function(response) { 
					$http.defaults.headers.common.Authorization = 'Basic ' + response.data.Token; 
					user = response.data.User; 
					token = response.data.Token; 
                    return response.data;
				});
				return promise; 
			},
			newEvaluation: function(templateId, startDate, endDate) {
				var promise = $http.post(serviceUrl + "api/v1/evaluations", {"TemplateID": templateId, "StartDate": startDate, "EndDate": endDate}).then(function(response) {
                    return response.data;
				});
				return promise; 
			},
			newTemplate: function(id, titleIS, titleEN, introTextIS, introTextEN, courseQuestions) { 
				var promise = $http.post(serviceUrl + "api/v1/evaluationtemplates", {"ID": id, "TitleIS": titleIS, "TitleEN": titleEN, "IntroTextIS": introTextIS, "IntroTextEN": introTextEN, "CourseQuestions": courseQuestions}).then(function(response){
                        return response.data;
                    }); 
				return promise; 
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
