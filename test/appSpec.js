describe('Testing the app.js file containing the module config, it', function(){
    var routeMock;
    beforeEach(function(){
        module('EvaluationApp');
        inject(function(_$route_) {
            routeMock = _$route_;
        });
    });

    it('should map routes to controllers', function() {
        expect(routeMock.routes['/home/'].controller).toBe('HomeController');
        expect(routeMock.routes['/home/'].templateUrl).toEqual('templates/home.html');

        expect(routeMock.routes['/evaluation/'].controller).toBe('EvaluationController');
        expect(routeMock.routes['/evaluation/'].templateUrl).toEqual('templates/evaluation.html');

        expect(routeMock.routes['/evaluation/:evaluationID'].controller).toBe('EvaluationController');
        expect(routeMock.routes['/evaluation/:evaluationID'].templateUrl).toEqual('templates/evaluation.html');

        expect(routeMock.routes['/'].controller).toBe('LoginController');
        expect(routeMock.routes['/'].templateUrl).toEqual('templates/login.html');

        expect(routeMock.routes[null].redirectTo).toEqual('/');
    });
});
