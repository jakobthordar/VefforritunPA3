describe('Testing the template controller, it', function () {
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

            ctrl = _$controller_('TemplateController', {
                $scope: rootScope,
                ApiFactory: ApiFactory,
            });
        });
    });

    it('should have all its functions', function() {
        expect(angular.isFunction(rootScope.addCourseQuestion)).toBe(true);
        expect(angular.isFunction(rootScope.init)).toBe(true);
        expect(angular.isFunction(rootScope.submitQuestion)).toBe(true);
        expect(angular.isFunction(rootScope.displayQuestionForm)).toBe(true);
    });

    it('should have all its variables', function() {
        expect(angular.isDefined(rootScope.courseQuestions)); 
        expect(angular.isDefined(rootScope.teacherQuestions));
        expect(angular.isDefined(rootScope.showQuestionForm)); 
    }); 

    it('should be able to add a new question to its view', function () {
        expect(rootScope.courseQuestions.length).toBe(0); 
        rootScope.addCourseQuestion(); 
        expect(rootScope.courseQuestions.length).toBe(1); 
        expect(rootScope.courseQuestions[0].ID).toBe(0); 
        expect(rootScope.courseQuestions[0].Answers.length).toBe(0); 
        expect(rootScope.courseQuestions[0].TextIS).toBe("Spurning 0");
        rootScope.addCourseQuestion(); 
        expect(rootScope.courseQuestions.length).toBe(2);
        expect(rootScope.courseQuestions[1].TextIS).toBe("Spurning 1");
    });

    it('should be able to accept a submitted question', function() {
        var newQuestion = {
            ID: 1, 
            TextIS: "Texti", 
            TextEN: "Text", 
            ImageURL: "ImageURL", 
            Type: "Type", 
            Answers: []
        };
        rootScope.submitQuestion(newQuestion); 
        expect(rootScope.courseQuestions.length).toBe(1); 
        expect(rootScope.courseQuestions[0].ID).toBe(0); 
        expect(rootScope.hideQuestionForm).toBe(true);
    });
});
