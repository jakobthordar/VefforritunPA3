app.controller("LoginController", [
	"$scope", "ApiFactory", "$location",
	function($scope, ApiFactory, $location) {
		$scope.login = {
			userName: "",
			password: ""
		};

		$scope.login = function(login) {
			console.log("Logged in");
			ApiFactory.login(login.user, login.pass).then(function(data) {
				$scope.user = data.User; 
				$scope.token = data.Token; 
				console.log("THE TOKEN: " + $scope.token);
				console.log("Logged in as " + $scope.user.Role); 
				$location.path("/home/");
			}, function(errorMessage) {
				console.log("Could not log in."); 
			});
		};
	}
]); 