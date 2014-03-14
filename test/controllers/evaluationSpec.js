describe('Testing the evaluation controller', function () {

    var rootScope, ctrl, $timeout, ApiFactory, httpBackend;
    
    //var apiFactoryMock;

    beforeEach(function(){

        module('EvaluationApp');

        inject(function($rootScope, $controller, _$httpBackend_,  _$q_, _$timeout_, _ApiFactory_) {
            var deferred = _$q_.defer();

            rootScope = $rootScope.$new();
            ApiFactory = _ApiFactory_;
            httpBackend = _$httpBackend_;
            $timeout = _$timeout_;

            deferred.resolve('resolvedData');
            spyOn(ApiFactory, 'getEvaluationById').andReturn(deferred.promise);

            ctrl = $controller('EvaluationController', {
                $scope: rootScope,
                ApiFactory: ApiFactory
            });
        });
    });

     afterEach(function() {
         httpBackend.verifyNoOutstandingExpectation();
         httpBackend.verifyNoOutstandingRequest();
     });

    it('should have all its functions', function() {
        expect(angular.isFunction(rootScope.addCourseQuestion)).toBe(true);
        expect(angular.isFunction(rootScope.addAnswer)).toBe(true);
    });

    it('should be able to add an answer', function() {
        var question = {
            Answers:[] 
        };
        expect(question.Answers[0]).toBeUndefined;
        rootScope.addAnswer(question);
        expect(question.Answers[0]).toBeDefined;
        expect(question.Answers).toContain("New answer");
        expect(question.Answers[1]).toBeUndefined;
    });

    it('should be able to add a course question', function() {
        var courseQuestion = {
            ID: 0,
            TextIS: "",
            TextEN: "",
            ImageURL: "",
            Type: "single",
            Answers: []
        };
        rootScope.addCourseQuestion();
        expect(rootScope.evaluation.CourseQuestions[0]).toBeDefined();
        expect(rootScope.evaluation.CourseQuestions).toContain(courseQuestion);
        rootScope.addCourseQuestion();
        expect(rootScope.evaluation.CourseQuestions[1]).toBeDefined();
        expect(rootScope.evaluation.CourseQuestions[2]).not.toBeDefined();
    });

    //TODO: This is not really doing anything
    it('should be able to get an Evaluation by id when evaluatinID is defined', function() {
        evaluationID = 1;

        expect(rootScope.evaluation).toBeDefined;
    });
});
