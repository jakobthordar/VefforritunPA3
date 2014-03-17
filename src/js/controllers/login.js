app.controller("LoginController", [
    "$scope", "ApiFactory", "$location",
    function($scope, ApiFactory, $location) {
        //This is currently not in use
        $scope.loginCred = {
            userName: "",
password: ""
        };
        $scope.token = "";
        $scope.user = "";

        $scope.login = function(login) {
            ApiFactory.login(login.user, login.pass).then(function(data) {
                $scope.user = data.User; 
                $scope.token = data.Token; 
                //console.log("THE TOKEN: " + ApiFactory.getToken());
                //Role is currently undefined as per tests
                //console.log("Logged in as " + ApiFactory.getUser().Role); 
                $location.path("/home/");
            }, function(errorMessage) {
                //console.log("Could not log in."); 
                $scope.errorMessage = "Could not log in.";
            });
        };
    }
]); 
