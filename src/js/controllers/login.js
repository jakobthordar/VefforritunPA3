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
				console.log("THE TOKEN: " + data);
				$location.path("/home/");
			}, function(errorMessage) {
				console.log("Could not log in."); 
			});
		};
	}
]); 