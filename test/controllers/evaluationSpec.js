describe('Testing the evaluation controller', function () {

    var $scope, ctrl, $timeout;
    
    var apiFactoryMock;

    /* Not sure if and how this works, á eftir að testa async calls */
    beforeEach(function(){

        apiFactoryMock = jasmine.createSpyObj('ApiFactory', ['someAsyncCall']);

        module('EvaluationApp');

        inject(function($rootScope, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();

            apiFactoryMock.someAsyncCall.andReturn($q.when('weee'));

            $timeout = _$timeout_;

            ctrl = $controller('EvaluationController', {
                $scope: $scope,
                apiFactory: apiFactoryMock
            });
        });
    });


    /* These are dummy tests for testing if karma works */
    it('should do something important', function() {
        expect(true).toBe(true);
    });

    it('should do something stupid', function() {
        expect(true).toBe(true);
    });

});
