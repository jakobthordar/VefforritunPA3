describe('Testing the ApiFactory, it', function(){
    var ApiFactory, timeout, httpMock, rootScope;
    var serviceUrl = 'http://dispatch.ru.is/H05/';
    var user = 'jakobt12';
    var pass = '123456';
    var evaluationsMock = [
      {
        "ID": 1,
        "TemplateTitleIS": "sample string 1",
        "TemplateTitleEN": "sample string 2",
        "StartDate": "2014-03-16T14:42:25.2215468+00:00",
        "EndDate": "2014-03-16T14:42:25.2215468+00:00",
        "Status": "sample string 1"
      },
      {
        "ID": 2,
        "TemplateTitleIS": "sample string 3",
        "TemplateTitleEN": "sample string 4",
        "StartDate": "2014-03-16T14:42:25.2215468+00:00",
        "EndDate": "2014-03-16T14:42:25.2215468+00:00",
        "Status": "sample string 2"
      },
      {
        "ID": 3,
        "TemplateTitleIS": "sample string 5",
        "TemplateTitleEN": "sample string 6",
        "StartDate": "2014-03-16T14:42:25.2215468+00:00",
        "EndDate": "2014-03-16T14:42:25.2215468+00:00",
        "Status": "sample string 3"
      }
    ];

    beforeEach(function (){
        module('EvaluationApp');
        inject(function(_ApiFactory_, _$httpBackend_, _$rootScope_) {
            ApiFactory = _ApiFactory_;
            httpMock = _$httpBackend_;
            rootScope = _$rootScope_.$new();
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

    it('should return an evaluation by id', function() {
        httpMock.when('GET', serviceUrl + 'api/v1/evaluations/1').respond(evaluationsMock[0]); 
        ApiFactory.getEvaluationById(1).then(function (data) {
            expect(data).toBeDefined; 
            expect(data.ID).toBe(1);
            expect(data.Status).toBe('sample string 1'); 
            expect(data.EndDate).toBe('2014-03-16T14:42:25.2215468+00:00'); 
        });
        httpMock.expectGET(serviceUrl + 'api/v1/evaluations/1').respond(evaluationsMock[0]);
        httpMock.flush(); 
    });

    it('should add an evaluation' , function () { 
        httpMock.when('POST', serviceUrl + 'api/v1/evaluations').respond(200);
        var newEvaluation = { "TemplateID": 1, "StartDate": "2014-03-16T14:42:19.7770528+00:00", "EndDate": "2014-03-16T14:42:19.7770528+00:00" };
        ApiFactory.addEvaluation(newEvaluation).then(function(data) {
            //TODO: Test more harder
            expect(data).toBeDefined;
        }); 
        httpMock.expectPOST(serviceUrl + 'api/v1/evaluations');
        httpMock.flush(); 
    });

    it('getUser() should return empty string when getUser is called without login', function() {
        expect(ApiFactory.getUser()).toBe("");
        expect(ApiFactory.getUser()).toBeDefined;
    });

    it('should be able to log a person in', function() {
        httpMock.when('POST', serviceUrl + 'api/v1/login').respond({User: "jakobt12", Token: "xxx"});
        ApiFactory.login(user, pass).then(function(data){
            expect(ApiFactory.getUser()).toBe(data.User);
            expect(data.User).toBe('jakobt12'); /* Note this is the same as in our mock */

            expect(ApiFactory.getToken()).toBe(data.Token);
            expect(data.Token).toBe("xxx");
            
            expect(data).toBeDefined;
        });
        httpMock.expectPOST(serviceUrl + "api/v1/login").respond({User: "jakobt12", Token: "xxx"});
        httpMock.flush();
    });

    it('should getAllEvaluations and return resolved data', function () {
        httpMock.when('GET', serviceUrl + 'api/v1/evaluations').respond(evaluationsMock);
        ApiFactory.getAllEvaluations().then(function(data) {
            expect(data).toBeDefined;
            expect(data).toEqual(evaluationsMock);
        });
        httpMock.expectGET(serviceUrl + 'api/v1/evaluations').respond(evaluationsMock);
        httpMock.flush(); 
    });

    it('should be able to submit a template', function() { 
        httpMock.when('POST', serviceUrl + "api/v1/evaluationtemplates").respond(200); 
        ApiFactory.newTemplate({}).then(function(data) {
            expect(data).toBeDefined; 
            console.log("data: " + data);
        });
        httpMock.expectPOST(serviceUrl + "api/v1/evaluationtemplates").respond(200); 
        httpMock.flush();
    });
});
