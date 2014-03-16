describe('Testing the ApiFactory', function(){
    var ApiFactory, timeout, httpMock, rootScope;
    var serviceUrl = 'http://project3api.haukurhaf.net/';

    beforeEach(function (){
        module('EvaluationApp');
        inject(function(_ApiFactory_, _$q_, _$httpBackend_, _$rootScope_) {
            ApiFactory = _ApiFactory_;
            httpMock = _$httpBackend_;
            rootScope = _$rootScope_.$new();
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
        var user = 'jakobt12';
        var pass = '123456';

        ApiFactory.login(user, pass).then(function(data){
            expect(ApiFactory.getUser()).toBe(data.User);
            expect(data.User).toBe('jakobt12');

            expect(ApiFactory.getToken()).toBe(data.Token);
            expect(data.Token).toBe("xxx");
        });
        httpMock.expectPOST(serviceUrl + "api/v1/login");
        httpMock.flush();
    });

    it('should be able to log a person in', function() {
        ApiFactory.login('jakobt12', '123456').then(function(data){
            expect(data).toBeDefined;
            expect(data).toBe('resolvedData');
        });
    });
});
