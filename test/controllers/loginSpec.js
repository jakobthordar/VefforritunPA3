describe('Testing the login controller, it', function() {
    var rootScope, ctrl, ApiFactory, deferred;
    var dataMock = {
        User: "userDummy",
        Token: "tokenDummy"
    };

    beforeEach(function(){
        module('EvaluationApp');
        inject(function(_$rootScope_, _$controller_, _$q_) {
            ApiFactory = {
                login: function(user, pass) {
                    deferred = _$q_.defer();
                    return deferred.promise;
                },
                getToken: function() {
                    return dataMock.User;
                },
                getUser: function() {
                    return dataMock.Token;
                }
            };
            rootScope = _$rootScope_.$new();
            spyOn(ApiFactory, 'login').andCallThrough();

            ctrl = _$controller_('LoginController', {
                $scope: rootScope,
                ApiFactory: ApiFactory,
                q: _$q_
            });
        });
    });

    it('should have all its functions', function() {
        expect(angular.isFunction(rootScope.login)).toBe(true);
    });

    it('should have its login object', function() {
        var user = 'jakobt12';
        var pass = '123456';
        expect(rootScope.loginCred).toBeDefined;
        expect(rootScope.loginCred.userName).toEqual("");
        expect(rootScope.loginCred.password).toBe("");
        rootScope.login.userName = user;
        rootScope.login.password = pass;
        expect(rootScope.login.userName).toBe('jakobt12');
        expect(rootScope.login.password).toBe('123456');
    });

    it('should be able to log a person in', function() {
        rootScope.login({user: "jakobt12", pass: "123456"});
        deferred.resolve(dataMock);
        rootScope.$digest();
        expect(ApiFactory.login).toHaveBeenCalled();
        expect(rootScope.token).toBe("tokenDummy");
        expect(rootScope.user).toBe("userDummy");
    });

    it('should redirect you correctly', function() {
    });
});
