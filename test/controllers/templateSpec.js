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
        expect(angular.isFunction(rootScope.typePrompt)).toBe(true); 
        expect(angular.isFunction(rootScope.addTextQuestion)).toBe(true); 
        expect(angular.isFunction(rootScope.addMultipleChoiceQuestion)).toBe(true); 
        expect(angular.isFunction(rootScope.addOption)).toBe(true); 
        expect(angular.isFunction(rootScope.optionSubmit)).toBe(true); 
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
        expect(angular.isDefined(rootScope.typePrompt));
        expect(angular.isDefined(rootScope.hideTeacherOptionButton));
        expect(angular.isDefined(rootScope.teacherOptions));
        expect(angular.isDefined(rootScope.hideTeacherOptionEntry));
    }); 

    it('should be able to accept a submitted question', function() {
        var newQuestion = {
            ID: 1, 
            TextIS: "Texti", 
            TextEN: "Text", 
            ImageURL: "ImageURL", 
            Type: "Type", 
            Answers: [],
        };
        rootScope.typeSelection = 'Course'; 
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
        rootScope.submitQuestion(newQuestion); 
        rootScope.typeSelection = 'Teacher'; 
        expect(rootScope.teacherQuestions.length).toBe(1); 
        expect(rootScope.teacherQuestions[0].ID).toBe(0); 
        expect(rootScope.teacherQuestions[0]).toBeDefined();
        expect(rootScope.hideQuestionForm).toBe(true);
        var newQuestion2 = {
            ID: 2, 
            TextIS: "Texti", 
            TextEN: "Text", 
            ImageURL: "ImageURL", 
            Type: "Type", 
            Answers: []
        };
        rootScope.typeSelection = 'Teacher'; 
        rootScope.submitQuestion(newQuestion2); 
        expect(rootScope.teacherQuestions.length).toBe(2); 
        expect(rootScope.teacherQuestions[1].ID).toBe(1); 
        expect(rootScope.hideQuestionForm).toBe(true);
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
        expect(rootScope.hideQuestionForm).toBe(true); 
        rootScope.displayQuestionForm();
        expect(rootScope.hideQuestionForm).toBe(false);
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

    it('should hide the teacher type prompt', function() {
        expect(rootScope.typePromptToggle).toBe(true); 
        rootScope.typePrompt(); 
        expect(rootScope.typePromptToggle).toBe(false);
    });

    it('should hide the teacher type prompt when it shows the teacher question form', function() {
        expect(rootScope.typePromptToggle).toBe(true); 
        expect(rootScope.hideQuestionForm).toBe(true);
        rootScope.addTextQuestion(); 
        expect(rootScope.typePromptToggle).toBe(false);
        expect(rootScope.hideQuestionForm).toBe(false);
    });

    it('should hide the teacher multiple choice type prompt when the multiple choice question form is displayed', function() {
        expect(rootScope.typePromptToggle).toBe(true); 
        expect(rootScope.hideMultipleQuestionForm).toBe(true);
        rootScope.addMultipleChoiceQuestion(); 
        expect(rootScope.typePromptToggle).toBe(false);
        expect(rootScope.hideMultipleQuestionForm).toBe(false);
    });

    it('should hide the teacher option button when the teacher option entry is displayed', function() {
        expect(rootScope.hideOptionButton).toBe(true); 
        expect(rootScope.hideOptionEntry).toBe(true);
        rootScope.addOption(); 
        expect(rootScope.hideOptionButton).toBe(true);
        expect(rootScope.hideOptionEntry).toBe(false);

        rootScope.hideOptionButton = false; 
        rootScope.addOption(); 
        expect(rootScope.hideOptionButton).toBe(true);
    });

    it('should be able to add a submitted option', function()  {
        expect(rootScope.hideOptionEntry).toBe(true); 
        expect(rootScope.questionOptions.length).toBe(0); 
        rootScope.optionSubmit(); 
        expect(rootScope.hideOptionEntry).toBe(false);
        expect(rootScope.optionEntryIS).toBe(""); 
        expect(rootScope.optionEntryEN).toBe(""); 
        expect(rootScope.optionEntryWeight).toBe(""); 
        expect(rootScope.optionEntryImageURL).toBe(""); 
        expect(rootScope.hideSubmitButton).toBe(false); 
    });

    it('should be able to add an option question', function() {
        rootScope.questionOptions = [
            {
                ID: 1,
                TextIS: "TextIS",
                TextEN: "TextEN", 
                Weight: "Weight", 
                ImageURL: "ImagreURL"
            },
            {
                ID: 2,
                TextIS: "TextIS",
                TextEN: "TextEN", 
                Weight: "Weight", 
                ImageURL: "ImagreURL"
            }
        ];
        var optionQuestion = {
            TextIS: "TextIS", 
            TextEN: "TextEN", 
            ImageURL: "Image URL"
        };
        rootScope.typeSelection = 'Teacher'; 
        rootScope.submitOptionQuestion(optionQuestion); 
        expect(rootScope.teacherOptionQuestions.length).toBe(1); 
        expect(rootScope.noTeacherQuestions).toBe(false);
        expect(rootScope.questionOptions.length).toBe(0); 

        rootScope.questionOptions = [
            {
                ID: 1,
                TextIS: "TextIS",
                TextEN: "TextEN", 
                Weight: "Weight", 
                ImageURL: "ImagreURL"
            },
            {
                ID: 2,
                TextIS: "TextIS",
                TextEN: "TextEN", 
                Weight: "Weight", 
                ImageURL: "ImagreURL"
            }
        ];
        var optionQuestion = {
            TextIS: "TextIS", 
            TextEN: "TextEN", 
            ImageURL: "Image URL"
        };
        rootScope.typeSelection = 'Course'; 
        rootScope.submitOptionQuestion(optionQuestion);
        expect(rootScope.courseOptionQuestions.length).toBe(1); 
        expect(rootScope.noCourseQuestions).toBe(false);
        expect(rootScope.questionOptions.length).toBe(0); 


    });
});
