app.directive('myEvals', function() {
    return {
        restrict: 'E',
        controller: 'HomeController',
        transclude: true,
        replace: true,
        scope: {},
        template: '<div><button>callFoo</button></div>',
        link: function(scope, element, attr) {
            console.log('hello');
            
           // scope.callFoo = (function () {
           //     otherCtrl.foo();
           // });
        }
    };
});
