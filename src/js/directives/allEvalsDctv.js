app.directive('myEvals', function() {
    return {
        restrict: 'E',
        controller: 'HomeController',
        templateUrl: 'templates/partials/myEvalsPartial.html',
        replace: true,
        link: function(scope, element, attr, homeCtrl){
        },
    };
});
