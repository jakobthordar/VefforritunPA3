app.controller("LoginController", [
	"$scope", "ApiFactory",  
	function($scope, ApiFactory) {
		$scope.login = {
			userName: "",
			password: ""
		};

		$scope.login = function(login) {
			console.log("Logged in");
			ApiFactory.login(login.user, login.pass).then(function(data) {
				console.log("THE TOKEN: " + data);
			}, function(errorMessage) {
				console.log("Could not log in."); 
			});
		};
	}
]); 