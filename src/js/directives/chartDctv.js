app.directive('myChart', function() {
    return {
        restrict: 'E',
        controller: 'ResultsController',
        templateUrl: 'templates/partials/myChartPartial.html',
    };
});
