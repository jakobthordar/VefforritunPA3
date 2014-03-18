app.controller("HomeController", [
	"$scope", "ApiFactory", "$location",
	function($scope, ApiFactory, $location) {

        //$scope.evaluations = [];
        $scope.evaluations = [
            {
                "ID": 1,
                "TemplateTitleIS": "Gervigreind",
                "TemplateTitleEN": "Artificial Intelligence",
                "StartDate": "2014-03-18T14:48:50.3810736+00:00",
                "EndDate": "2014-03-18T14:48:50.3810736+00:00",
                "Status": "sample string 6"
            },
            {
                "ID": 2,
                "TemplateTitleIS": "Stýrikerfi",
                "TemplateTitleEN": "Operating Systems",
                "StartDate": "2014-03-18T14:48:50.3810736+00:00",
                "EndDate": "2014-03-18T14:48:50.3810736+00:00",
                "Status": "sample string 6"
            },
            {
                "ID": 4,
                "TemplateTitleIS": "Derp",
                "TemplateTitleEN": "Herp",
                "StartDate": "2014-03-18T14:48:50.3810736+00:00",
                "EndDate": "2014-03-18T14:48:50.3810736+00:00",
                "Status": "sample string 6"
            },
            {
                "ID": 3,
                "TemplateTitleIS": "Vefforritun",
                "TemplateTitleEN": "Web Programming",
                "StartDate": "2014-03-18T14:48:50.3810736+00:00",
                "EndDate": "2014-03-18T14:48:50.3810736+00:00",
                "Status": "sample string 6"
            }
        ];

		$scope.showButton = (function () {
            var user = ApiFactory.getUser();
            var isAdmin = false;
			if (user.Role === "admin") {
                isAdmin = true;
			}
            return isAdmin;
		});

        $scope.editEvaluation = (function() {

        });

		$scope.newEval = (function(evaluation) {
            /*ar dummyEval = {
                "TemplateID": 0,
                "StartDate": "2014-03-17T15:28:40.2360731+00:00",
                "EndDate": "2014-03-17T15:28:40.2360731+00:00"
            };
            ApiFactory.addEvaluation(dummyEval).then(function(data) 
            {
                $scope.getAllEvals();
            });*/
			$location.path("/evaluation/new");
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

        $scope.getAllEvals();
	}
]);
