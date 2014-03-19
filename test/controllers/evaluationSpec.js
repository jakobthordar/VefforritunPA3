describe('Testing the evaluation controller, it', function () {
    var rootScope, scope, ctrl, $timeout, ApiFactory, locationMock;
    var evalDataMock = {
        TitleIS: "dummyTitleIS",
        TitleEN: "dummyTitleEN",
        IntroTextIS: "dummyIntroTextIS",
        IntroTextEN: "dummyIntroTestEN",
        CourseQuestions: [],
        TeacherQuestions: []
    };

    var locationMock = {
        path: "herp"
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
                getTemplateById: function(templateId) { 
                    deferred = _$q_.defer(); 
                    return deferred.promise;
                },
                newEvaluation: function(templateId, startTime, endTime) {
                    return 1; 
                },
                getAllTemplates: function() {
                    var ret = [
                        {
                            ID:1
                        },
                        {
                            ID:2
                        },
                        {
                            ID:3
                        }
                    ];
                }
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

    /*it('should have all of the variables it needs for the calendar', function () {
        expect(rootScope.hstep).toBeDefined(); 
        expect(rootScope.mstep).toBeDefined();
        expect(rootScope.dt).toBeDefined(); 
        expect(rootScope.showWeeks).toBeDefined(); 
        expect(rootScope.minDate).toBeDefined(); 
        expect(rootScope.opened).toBeDefined(); 
        expect(rootScope.dateOptions).toBeDefined(); 
        expect(rootScope.formats).toBeDefined(); 
        expect(rootScope.format).toBeDefined(); 
        expect(rootScope.format).toBe('dd-MMMM-yyyy'); 

    });*/

    /*it('should have all of the functions it needs for the calendar and time', function() {
        expect(angular.isFunction(rootScope.startTimeChanged)).toBe(true); 
        expect(angular.isFunction(rootScope.endTimeChanged)).toBe(true); 
        expect(angular.isFunction(rootScope.startDateChanged)).toBe(true); 
        expect(angular.isFunction(rootScope.endDateChanged)).toBe(true);
    });*/

    it('should be able to submit a new evaluation', function() {
        rootScope.template = { ID: 1 }; 
        rootScope.submitEvaluation(); 
        expect(rootScope.startTime).toBeDefined(); 
        expect(rootScope.endTime).toBeDefined();
        expect(rootScope.startTime).not.toBe(""); 
        expect(rootScope.endTime).not.toBe(""); 
        rootScope.startTime = Date(); 
        rootScope.endTime = Date(); 
        rootScope.submitEvaluation(); 
    }); 

    it('should change the start and end dates when prompted to', function() {
        rootScope.startTimeChanged(1); 
        rootScope.endTimeChanged(1); 
        expect(rootScope.startTime).toBe(1); 
        expect(rootScope.endTime).toBe(1);
    });

});
