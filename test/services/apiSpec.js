describe('Testing the ApiFactory', function(){
    var apiFactory;

    beforeEach(function (){
        module('EvaluationApp');

        inject(function(_ApiFactory_) {
            apiFactory = _ApiFactory_;
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
