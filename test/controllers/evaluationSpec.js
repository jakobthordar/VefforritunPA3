describe('Testing the evaluation controller', function () {

    var $scope, ctrl, $timeout, ApiFactory;
    
    //var apiFactoryMock;

    beforeEach(function(){

        //apiFactoryMock = jasmine.createSpyObj('ApiFactory', ['someAsyncCall']);

        module('EvaluationApp');

        inject(function($rootScope, $controller, _$q_, _$timeout_, _ApiFactory_) {
            var deferred = _$q_.defer();

            $scope = $rootScope.$new();
            //apiFactoryMock.someAsyncCall.andReturn(deferred.promise);
            ApiFactory = _ApiFactory_;
            $timeout = _$timeout_;

            deferred.resolve('resolvedData');
            spyOn(ApiFactory, 'getEvaluationById').andReturn(deferred.promise);

            ctrl = $controller('EvaluationController', {
                $scope: $scope,
                ApiFactory: ApiFactory
            });
        });
    });

    it('should have all its functions', function() {
        expect(angular.isFunction($scope.addCourseQuestion)).toBe(true);
        expect(angular.isFunction($scope.addAnswer)).toBe(true);
    });

    it('should be able to add an answer', function() {
        var question = {
            Answers:[] 
        };
        expect(question.Answers[0]).toBeUndefined;
        $scope.addAnswer(question);
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
        $scope.addCourseQuestion();
        expect($scope.evaluation.CourseQuestions[0]).toBeDefined();
        expect($scope.evaluation.CourseQuestions).toContain(courseQuestion);
        $scope.addCourseQuestion();
        expect($scope.evaluation.CourseQuestions[1]).toBeDefined();
        expect($scope.evaluation.CourseQuestions[2]).not.toBeDefined();
    });

    //TODO: This is not really doing anything
    it('should be able to get an Evaluation by id when evaluatinID is defined', function() {
        evaluationID = 1;

        expect($scope.evaluation).toBeDefined;
    });
});
