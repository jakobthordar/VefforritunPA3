app.controller("HomeController", [
	"$scope", "ApiFactory", "$location",
	function($scope, ApiFactory, $location) {

        $scope.evaluations = [];
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

		$scope.newEval = (function(evaluation) {
            var dummyEval = {
                "TemplateID": 1,
                "StartDate": "2014-03-17T15:28:40.2360731+00:00",
                "EndDate": "2014-03-17T15:28:40.2360731+00:00"
            };
            ApiFactory.addEvaluation(dummyEval).then(function(data) 
            {
                $scope.getAllEvals();
            });
			//$location.path("/evaluation/new");
		}); 

		$scope.newTemplate = (function () {
			$location.path("/template/new"); 
		});

        $scope.getAllEvals = (function() {
            $scope.status = "Waiting...";
            ApiFactory.getAllEvaluations().then(function(data) {
                //console.log("Success, data: ", data);
                $scope.evaluations = data;
                $scope.status = "Success.";
            }, function(errorMessage) {
                //console.log("Error: " + errorMessage);
                $scope.status = "Error: " + errorMessage;
            });
        });
	}
]);
