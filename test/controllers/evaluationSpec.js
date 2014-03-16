describe('Testing the evaluation controller, it', function () {
    var rootScope, ctrl, $timeout, ApiFactory;
    var evalDataMock = {
        TitleIS: "dummyTitleIS",
        TitleEN: "dummyTitleEN",
        IntroTextIS: "dummyIntroTextIS",
        IntroTextEN: "dummyIntroTestEN",
        CourseQuestions: [],
        TeacherQuestions: []
    };

    var emptyEvalDataMock = {
        TitleIS: "",
        TitleEN: "",
        IntroTextIS: "",
        IntroTextEN: "",
        CourseQuestions: [],
        TeacherQuestions: []
    };

    beforeEach(function(){
        module('EvaluationApp');
        inject(function(_$rootScope_, _$controller_, _$q_) {
            ApiFactory = {
                getEvaluationById: function(evaluationID){
                    deferred = _$q_.defer();
                    return deferred.promise;
                },
            };
            spyOn(ApiFactory, 'getEvaluationById').andCallThrough();
            rootScope = _$rootScope_.$new();

            ctrl = _$controller_('EvaluationController', {
                $scope: rootScope,
                ApiFactory: ApiFactory,
            });
        });
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
       rootScope.init(0);

       deferred.resolve(evalDataMock);
       rootScope.$digest();
       expect(ApiFactory.getEvaluationById).toHaveBeenCalled();
       expect(rootScope.evaluation).toBe(evalDataMock);
    });

    it('should return an error if the evaluationID promise got rejected', function() {
       rootScope.init(0);
       var errorMessage = "Failed to get evaluation.";

       deferred.reject(errorMessage);
       rootScope.$digest();
       expect(ApiFactory.getEvaluationById).toHaveBeenCalled();
       expect(rootScope.errorMessage).toBe("Error fetching evaluation: " + errorMessage);
    });

    it('should create an empty evalutaion when evaluatinID is undefined', function() {
        rootScope.init();
        expect(rootScope.evaluation).toEqual(emptyEvalDataMock);
    });
});
