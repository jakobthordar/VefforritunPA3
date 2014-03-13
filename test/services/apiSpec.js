describe('Testing the ApiFactory', function(){
    var apiFactory;

    beforeEach(function (){
        module('EvaluationApp');

        inject(function(_ApiFactory_, _$q_) {
            var deferred = _$q_.defer();
            apiFactory = _ApiFactory_;

            deferred.resolve('resolvedData');
            spyOn(apiFactory, 'getAllEvaluations').andReturn(deferred.promise);
            spyOn(apiFactory, 'getEvaluationById').andReturn(deferred.promise);
            spyOn(apiFactory, 'addEvaluation').andReturn(deferred.promise);
            spyOn(apiFactory, 'login').andReturn(deferred.promise);
            
        });
    });

    it('should have all its functions', function() {
        expect(angular.isFunction(apiFactory.getAllEvaluations)).toBe(true);
        expect(angular.isFunction(apiFactory.getEvaluationById)).toBe(true);
        expect(angular.isFunction(apiFactory.addEvaluation)).toBe(true);
    });

    it('return an evaluation by id', function() {
    });
});
