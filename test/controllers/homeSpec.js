describe("Testing the home controller, it", function() {
    var rootScope, ctrl, ApiFactory, deferred;

    var dataMock = {
        User: "admin", 
        Token: "abcdefg",
        evaluations: [
          {
            "ID": 1,
            "TemplateTitleIS": "sample string 2",
            "TemplateTitleEN": "sample string 3",
            "StartDate": "2014-03-16T14:42:25.2215468+00:00",
            "EndDate": "2014-03-16T14:42:25.2215468+00:00",
            "Status": "sample string 6"
          },
          {
            "ID": 1,
            "TemplateTitleIS": "sample string 2",
            "TemplateTitleEN": "sample string 3",
            "StartDate": "2014-03-16T14:42:25.2215468+00:00",
            "EndDate": "2014-03-16T14:42:25.2215468+00:00",
            "Status": "sample string 6"
          },
          {
            "ID": 1,
            "TemplateTitleIS": "sample string 2",
            "TemplateTitleEN": "sample string 3",
            "StartDate": "2014-03-16T14:42:25.2215468+00:00",
            "EndDate": "2014-03-16T14:42:25.2215468+00:00",
            "Status": "sample string 6"
          }
        ]
    }
    beforeEach(function(){
        module('EvaluationApp');
        inject(function(_$rootScope_, _$controller_, _$q_) {
            /* This mocks the ApiFactory service */
            ApiFactory = {
                getAllEvaluations: function() {
                    deferred = _$q_.defer();
                    deferred.resolve(dataMock.evaluations);
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
