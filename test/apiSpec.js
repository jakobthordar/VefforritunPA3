describe('Testing the ApiFactory', function(){
    var apiFactory;

    beforeEach(function (){
        module('EvaluationApp');

        inject(function(_ApiFactory_) {
            apiFactory = _ApiFactory_;
        });
    });

    it('should have a getAllEvaluations function', function() {
        expect(angular.isFunction(apiFactory.getAllEvaluations)).toBe(true);
    });

    it('should have a getEvaluationById function', function() {
        expect(angular.isFunction(apiFactory.getEvaluationById)).toBe(true);
    });

    it('should have a addEvaluationtfunction', function() {
        expect(angular.isFunction(apiFactory.addEvaluation)).toBe(true);
    });
});
