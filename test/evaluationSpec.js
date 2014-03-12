describe('Testing the evaluation controller', function () {

    var $scope, ctrl, $timeout;
    
    var ApiFactoryMock;

    beforeEach(function(){

        apiFactoryMock = jasmine.createSpyObj('ApiFactory', ['someAsyncCall']);

        module('EvaluationApp');

        inject(function($rootScope, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();

            apiFactoryMock.someAsyncCall.andReturn($q.when('weee'));

            $timeout = _$timeout_;

            ctrl = $controller('EvaluationController', {
                $scope: $scope,
                ApiFactory: ApiFactoryMock
            });
        });
    });


    it('should do something important', function() {
        expect(true).toBe(true);
    });

    it('should do something stupid', function() {
        expect(true).toBe(true);
    });
});
