describe('Testing the ApiFactory', function(){
    var ApiFactory, timeout, httpMock, rootScope;
    var serviceUrl = 'http://dispatch.ru.is/H05/';
    var user = 'jakobt12';
    var pass = '123456';

    beforeEach(function (){
        module('EvaluationApp');
        inject(function(_ApiFactory_, _$httpBackend_, _$rootScope_) {
            ApiFactory = _ApiFactory_;
            httpMock = _$httpBackend_;
            rootScope = _$rootScope_.$new();
            /* Mock a response from the Api when we POST, GET would be similar */
            httpMock.when('POST', serviceUrl + 'api/v1/login').respond({User: "jakobt12", Token: "xxx"});
        });
    });

    it('should have all its functions', function() {
        expect(angular.isFunction(ApiFactory.getAllEvaluations)).toBe(true);
        expect(angular.isFunction(ApiFactory.getEvaluationById)).toBe(true);
        expect(angular.isFunction(ApiFactory.addEvaluation)).toBe(true);
    });

    it('return an evaluation by id', function() {
        ApiFactory.getAllEvaluations().then(function(data){
            expect(data).toBe('resolvedData');
            expect(data).toBeDefined;
        });
    });

    it('getUser() should return empty string when getUser is called without login', function() {
        expect(ApiFactory.getUser()).toBe("");
        expect(ApiFactory.getUser()).toBeDefined;
    });

    it('getUser() should return the user after he has logged in', function() {
        ApiFactory.login(user, pass).then(function(data){
            expect(ApiFactory.getUser()).toBe(data.User);
            expect(data.User).toBe('jakobt12'); /* Note this is the same as in our mock */

            expect(ApiFactory.getToken()).toBe(data.Token);
            expect(data.Token).toBe("xxx");
        });
        httpMock.expectPOST(serviceUrl + "api/v1/login");
        httpMock.flush();
    });

    it('should be able to log a person in', function() {
        ApiFactory.login(user, pass).then(function(data){
            expect(data).toBeDefined;
            expect(data).toBe('resolvedData');
        });
    });
});
