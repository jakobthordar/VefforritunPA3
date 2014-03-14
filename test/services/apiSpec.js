describe('Testing the ApiFactory', function(){
    var ApiFactory, timeout, httpMock, rootScope;

    beforeEach(function (){
        module('EvaluationApp');

        inject(function(_ApiFactory_, _$q_, _$timeout_, _$httpBackend_, _$rootScope_) {
            var deferred = _$q_.defer();
            ApiFactory = _ApiFactory_;
            timeout = _$timeout_;
            httpMock = _$httpBackend_;
            rootScope = _$rootScope_;

            deferred.resolve('resolvedData');
            spyOn(ApiFactory, 'getAllEvaluations').andReturn(deferred.promise);
            spyOn(ApiFactory, 'getEvaluationById').andReturn(deferred.promise);
            spyOn(ApiFactory, 'addEvaluation').andReturn(deferred.promise);
            spyOn(ApiFactory, 'login').andReturn(deferred.promise);
        });
    });

    afterEach(function() {
        httpMock.verifyNoOutstandingExpectation();
        httpMock.verifyNoOutstandingRequest();
    });

    it('should have all its functions', function() {
        expect(angular.isFunction(ApiFactory.getAllEvaluations)).toBe(true);
        expect(angular.isFunction(ApiFactory.getEvaluationById)).toBe(true);
        expect(angular.isFunction(ApiFactory.addEvaluation)).toBe(true);
    });

    it('return an evaluation by id', function() {
        var result;
        ApiFactory.getAllEvaluations().then(function(data){
            result = data;
        });
        rootScope.$apply();
        expect(result).toBe('resolvedData');
    });

    it('getUser() should return empty string when getUser is called without login', function() {
        expect(ApiFactory.getUser()).toBe("");
        expect(ApiFactory.getUser()).toBeDefined;
    });

    it('getUser() should return the user after he has logged in', function() {
		var serviceUrl = "http://project3api.haukurhaf.net/";
        httpMock.flush();


        //httpMock.expectPOST(serviceUrl + "api/c1/login", 
        //    {"user": username, "pass": password}).respond(201,);
    });

    it('should be able to log a person in', function() {
        var result;
        var returnData;


        ApiFactory.login('jakobt12', '123456').then(function(data){
            result = data;
        });
        rootScope.$apply();
        expect(result).toBeDefined;
        expect(result).toBe('resolvedData');
    });
});
