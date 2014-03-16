describe('Testing the ApiFactory', function(){
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
            /* Mock a response from the Api when we POST, GET would be similar */
        });
    });

    it('should have all its functions', function() {
        expect(angular.isFunction(ApiFactory.getAllEvaluations)).toBe(true);
        expect(angular.isFunction(ApiFactory.getEvaluationById)).toBe(true);
        expect(angular.isFunction(ApiFactory.addEvaluation)).toBe(true);
    });

    it('return an evaluation by id', function() {
        httpMock.when('GET', serviceUrl + 'api/v1/evaluations/1').respond(evaluationsMock[0]); 
        ApiFactory.getEvaluationById(1).then(function (data) {
            expect(data).toBeDefined; 
            expect(data.ID).toBe(1);
            expect(data.Status).toBe('sample string 1'); 
            expect(data.EndDate).toBe('2014-03-16T14:42:25.2215468+00:00'); 
        });
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
        httpMock.expectPOST(serviceUrl + "api/v1/login");
        httpMock.flush();
    });
});
