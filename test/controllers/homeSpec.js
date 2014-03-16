describe("Testing the home controller, it", function() {
    var rootScope, ctrl, ApiFactory, deferred;

    beforeEach(function(){
        module('EvaluationApp');
        inject(function(_$rootScope_, _$controller_, _$q_) {
            /* This mocks the ApiFactory service */
            ApiFactory = {
                getAllEvaluations: function() {
                    deferred = _$q_.defer();
                    return deferred.promise;
                },
                getToken: function() {
                    return dataMock.User;
                },
                getUser: function() {
                    return dataMock.Token;
                }
            };
            /* Spy on the service and call it */
            spyOn(ApiFactory, 'getAllEvaluations').andCallThrough();
            rootScope = _$rootScope_.$new();
            /* This mocks the controller */
            ctrl = _$controller_('HomeController', {
                $scope: rootScope,
                ApiFactory: ApiFactory,
            });
        });
    });

    it('should be able to get all evaluations', function() {
        
    });
});
