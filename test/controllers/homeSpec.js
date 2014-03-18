describe("Testing the home controller, it", function() {
    var rootScope, ctrl, ApiFactory, deferred;

    var evalListMock = {
        evaluations: [
            {
                "ID": 1,
                "TemplateTitleIS": "sample string 2",
                "TemplateTitleEN": "sample string 3",
                "StartDate": "2014-03-17T15:28:35.4156007+00:00",
                "EndDate": "2014-03-17T15:28:35.4156007+00:00",
                "Status": "sample string 6"
            },
            {
                "ID": 2,
                "TemplateTitleIS": "sample string 2",
                "TemplateTitleEN": "sample string 3",
                "StartDate": "2014-03-17T15:28:35.4156007+00:00",
                "EndDate": "2014-03-17T15:28:35.4156007+00:00",
                "Status": "sample string 6"
            },
            {
                "ID": 3,
                "TemplateTitleIS": "sample string 2",
                "TemplateTitleEN": "sample string 3",
                "StartDate": "2014-03-17T15:28:35.4156007+00:00",
                "EndDate": "2014-03-17T15:28:35.4156007+00:00",
                "Status": "sample string 6"
            }
        ]
    };
     
    var newEvaluationMock = {
        "TemplateID": 1,
        "StartDate": "2014-03-17T15:28:40.2360731+00:00",
        "EndDate": "2014-03-17T15:28:40.2360731+00:00"
    };
    var userMock = {
        "Role": "admin"
    };


    beforeEach(function(){
        module('EvaluationApp');
        inject(function(_$rootScope_, _$controller_, _$q_) {
            /* This mocks the ApiFactory service */
            ApiFactory = {
                getAllEvaluations: function() {
                    deferred = _$q_.defer();
                    return deferred.promise;
                },
                addEvaluation: function() {
                    deferred = _$q_.defer();
                    return deferred.promise;
                },
                getToken: function() {
                    return dataMock.Token;
                },
                getUser: function() {
                    return userMock;
                }
            };
            /* Spy on the service and call it */
            spyOn(ApiFactory, 'getAllEvaluations').andCallThrough();
            spyOn(ApiFactory, 'addEvaluation').andCallThrough();
            spyOn(ApiFactory, 'getUser').andCallThrough();
            rootScope = _$rootScope_.$new();
            /* This mocks the controller */
            ctrl = _$controller_('HomeController', {
                $scope: rootScope,
                ApiFactory: ApiFactory,
            });
        });
    });

    it('should be able to get all evaluations', function() {
        rootScope.getAllEvals();

        deferred.resolve(evalListMock.evaluations);
        rootScope.$digest();
        expect(ApiFactory.getAllEvaluations).toHaveBeenCalled();
        expect(rootScope.evaluations).toEqual(evalListMock.evaluations);
        expect(rootScope.status).toEqual("Success.");
    });

    it('should only show an add new eval button for admins', function() {
        var foo = rootScope.showButton();
        expect(ApiFactory.getUser).toHaveBeenCalled();
        expect(foo).toBe(true);
    });

    it('should reject if get all evaluations fails', function() {
        rootScope.getAllEvals();
        var errorMsg = "could not get all evaluations";

        deferred.reject(errorMsg);
        rootScope.$digest();
        expect(ApiFactory.getAllEvaluations).toHaveBeenCalled();
        expect(rootScope.status).toEqual("Error: " + errorMsg);
    });

    it('should be able to add a new evaluation', function() {
        rootScope.newEval();
        deferred.resolve("success");
        rootScope.$digest();
        //expect(ApiFactory.getAllEvaluations).toHaveBeenCalled();
        //expect(ApiFactory.addEvaluation).toHaveBeenCalled();
    });
});
