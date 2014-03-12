app.controller("LoginController", [
	"$scope", "ApiFactory",  
	function($scope, ApiFactory) {
		$scope.login = {
			userName: "",
			password: ""
		};

		$scope.login = function() {
			console.log("Logged in");
		}
	}
]); 