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
        inject(function(_$rootScope_, _$controller_, $location) {
            ApiFactory = {
                newTemplate: function(templateObject) {

                }
            };
            rootScope = _$rootScope_.$new();

            ctrl = _$controller_('TemplateController', {
                $scope: rootScope,
                ApiFactory: ApiFactory,
            });
        });
    });

    it('should have all its functions', function() {
        expect(angular.isFunction(rootScope.init)).toBe(true);
        expect(angular.isFunction(rootScope.submitQuestion)).toBe(true);
        expect(angular.isFunction(rootScope.displayQuestionForm)).toBe(true);
        expect(angular.isFunction(rootScope.submitTemplateInfo)).toBe(true); 
    });

    it('should have all its variables', function() {
        expect(angular.isDefined(rootScope.courseQuestions)); 
        expect(angular.isDefined(rootScope.teacherQuestions));
        expect(angular.isDefined(rootScope.showQuestionForm)); 
        expect(angular.isDefined(rootScope.templateInfo)); 
        expect(angular.isDefined(rootScope.hideQuestionForm));
        expect(angular.isDefined(rootScope.hideTeacherQuestionForm)); 
        expect(angular.isDefined(rootScope.noTeacherQuestions));
        expect(angular.isDefined(rootScope.noCourseQuestions));
        expect(angular.isDefined(rootScope.hideInfoForm));
        expect(angular.isDefined(rootScope.hideError));
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
        var newQuestion2 = {
            ID: 2, 
            TextIS: "Texti", 
            TextEN: "Text", 
            ImageURL: "ImageURL", 
            Type: "Type", 
            Answers: []
        };
        rootScope.submitQuestion(newQuestion2); 
        expect(rootScope.courseQuestions.length).toBe(2); 
        expect(rootScope.courseQuestions[1].ID).toBe(1); 
        expect(rootScope.hideQuestionForm).toBe(true);
    });

    it('should be able to accept a submitted teacher question', function() {
        var newQuestion = {
            ID: 1, 
            TextIS: "Texti", 
            TextEN: "Text", 
            ImageURL: "ImageURL", 
            Type: "Type", 
            Answers: []
        };
        rootScope.submitTeacherQuestion(newQuestion); 
        expect(rootScope.teacherQuestions.length).toBe(1); 
        expect(rootScope.teacherQuestions[0].ID).toBe(0); 
        expect(rootScope.hideTeacherQuestionForm).toBe(true);
        var newQuestion2 = {
            ID: 2, 
            TextIS: "Texti", 
            TextEN: "Text", 
            ImageURL: "ImageURL", 
            Type: "Type", 
            Answers: []
        };
        rootScope.submitTeacherQuestion(newQuestion2); 
        expect(rootScope.teacherQuestions.length).toBe(2); 
        expect(rootScope.teacherQuestions[1].ID).toBe(1); 
        expect(rootScope.hideTeacherQuestionForm).toBe(true);
    });

    it('should be able to accept template information when saved', function() {
        var templateInfo = {
            TitleIS: "Titill", 
            TitleEN: "Title", 
            IntroTextIS: "Hehe", 
            IntroTextEN: "Huhu"
        };
        rootScope.submitTemplateInfo(templateInfo); 
        expect(rootScope.templateInfo.TitleIS).toBe("Titill");
        expect(rootScope.infoSubmitted).toBe(true);
    }); 

    it('should display its question form', function() {
        expect(rootScope.hideQuestionForm).toBe(true); 
        rootScope.displayQuestionForm(); 
        expect(rootScope.hideQuestionForm).toBe(false); 
    });

    it('should display its teacher question form', function() {
        expect(rootScope.hideTeacherQuestionForm).toBe(true); 
        rootScope.displayTeacherQuestionForm();
        expect(rootScope.hideTeacherQuestionForm).toBe(false);
    });

    it('should submit its new template to the API', function() {
        rootScope.infoSubmitted = true;
        expect(angular.isDefined(rootScope.submitButton));
        rootScope.templateInfo = {
            TitleIS: "herp", 
            TitleEN: "derp", 
            IntroTextIS: "lerp", 
            IntroTextEN: "serp", 
        };
        rootScope.courseQuestions = []; 
        rootScope.teacherQuestions = []; 
        rootScope.submitTemplate(); 
        rootScope.infoSubmitted = false; 
        rootScope.submitTemplate(); 
        expect(rootScope.hideError).toBe(false);
        rootScope.hideError = true; 
        rootScope.infoSubmitted = true; 
        rootScope.submitTemplate(); 
        expect(rootScope.hideError).toBe(false);
        rootScope.hideError = true; 
        rootScope.teacherQuestions.push(1); 
        rootScope.submitTemplate(); 
        expect(rootScope.hideError).toBe(true); 
    });
});
