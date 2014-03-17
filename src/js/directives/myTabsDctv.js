app.directive('myAllEvaluations', function() {
    return {
        restrict: 'E',
        transclude: true,
        require: '^homeController',
        scope: false,
        templateUrl: 'my-tabs.html'
        link: function(scope, element, attrs, homeCtrl) {
        },
    };
});
