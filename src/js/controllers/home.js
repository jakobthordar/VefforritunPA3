app.controller("HomeController", [
	"$scope", "ApiFactory", "$location",
	function($scope, ApiFactory, $location) {

		$scope.showButton = (function () {
			if (ApiFactory.getUser().Role == "admin") {
				return true; 
			}
			else {
				return false; 
			}
		});

        $scope.editEvaluation = (function() {
        });

		$scope.newEvaluation = (function () {
			$location.path("/evaluation/new");
		}); 

		$scope.newTemplate = (function () {
			$location.path("/template/new"); 
		});

		ApiFactory.getAllEvaluations().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
	}
]);
