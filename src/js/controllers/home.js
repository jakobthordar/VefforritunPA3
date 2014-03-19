app.controller("HomeController", [
	"$scope", "ApiFactory", "$location",
	function($scope, ApiFactory, $location) {

        $scope.evaluations = [];
        $scope.courses = [];

		$scope.showButton = (function () {
            var user = ApiFactory.getUser();
            var isAdmin = false;
			if (user.Role === "admin") {
                isAdmin = true;
			}

            return isAdmin;
		});

        $scope.editEvaluation = (function() {
            $location.path("/evaluation/edit");
        });

        $scope.results = (function() {
            $location.path("/results");
        });

		$scope.newEval = (function(evaluation) {
			$location.path("/evaluation/new");
		}); 

		$scope.newTemplate = (function () {
			$location.path("/template/new"); 
		});

        $scope.getAllEvals = (function() {
            ApiFactory.getAllEvaluations().then(function(data) {
                $scope.evaluations = data;
                console.log(data);
            });
        });
        $scope.getMyCourses = (function() {
            ApiFactory.getMyCourses().then(function(data) {
                $scope.courses = data;
                console.log(data);
            });
        });
        this.init = (function() {
            $scope.getAllEvals();
            $scope.getMyCourses();
            /*ApiFactory.getEvaluationById(1).then(function(data) {
                console.log(data);
            });*/
        });
        this.init();

	}
]);
