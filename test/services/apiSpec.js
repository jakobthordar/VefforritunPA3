describe('Testing the ApiFactory, it', function(){
    var ApiFactory, timeout, httpMock, rootScope;
    var serviceUrl = 'http://dispatch.ru.is/H05/';
    var user = 'jakobt12';
    var pass = '123456';

    var evaluationsMock = [
        {
        "ID": 1,
        "TemplateTitleIS": "sample string 1",
        "TemplateTitleEN": "sample string 2",
        "StartDate": "2014-03-16T14:42:25.2215468+00:00",
        "EndDate": "2014-03-16T14:42:25.2215468+00:00",
        "Status": "sample string 1"
        },
        {
        "ID": 2,
        "TemplateTitleIS": "sample string 3",
        "TemplateTitleEN": "sample string 4",
        "StartDate": "2014-03-16T14:42:25.2215468+00:00",
        "EndDate": "2014-03-16T14:42:25.2215468+00:00",
        "Status": "sample string 2"
        },
        {
        "ID": 3,
        "TemplateTitleIS": "sample string 5",
        "TemplateTitleEN": "sample string 6",
        "StartDate": "2014-03-16T14:42:25.2215468+00:00",
        "EndDate": "2014-03-16T14:42:25.2215468+00:00",
        "Status": "sample string 3"
        }
    ];

    var myEvaluationsMock = [
        {
            "ID": 1,
            "CourseID": "sample string 2",
            "CourseNameIS": "sample string 3",
            "CourseNameEN": "sample string 4",
            "TemplateNameIS": "sample string 5",
            "TemplateNameEN": "sample string 6",
            "Semester": "sample string 7"
        },
        {
            "ID": 1,
            "CourseID": "sample string 2",
            "CourseNameIS": "sample string 3",
            "CourseNameEN": "sample string 4",
            "TemplateNameIS": "sample string 5",
            "TemplateNameEN": "sample string 6",
            "Semester": "sample string 7"
        },
        {
            "ID": 1,
            "CourseID": "sample string 2",
            "CourseNameIS": "sample string 3",
            "CourseNameEN": "sample string 4",
            "TemplateNameIS": "sample string 5",
            "TemplateNameEN": "sample string 6",
            "Semester": "sample string 7"
        }
    ];

    var templatesMock = [
        {
        "ID": 1,
        "TitleIS": "sample string 2",
        "TitleEN": "sample string 3"
        },
        {
        "ID": 2,
        "TitleIS": "sample string 4",
        "TitleEN": "sample string 5"
        },
        {
        "ID": 3,
        "TitleIS": "sample string 6",
        "TitleEN": "sample string 7"
        }
    ];

    var coursesMock = [
        {
            "ID": 1,
            "CourseID": "sample string 2",
            "NameIS": "Gervigreind",
            "NameEN": "Artificial Intelligence",
            "DateBegin": "2014-03-17T22:21:39.8295436+00:00",
            "DateEnd": "2014-03-17T22:21:39.8295436+00:00"
        },
        {
            "ID": 2,
            "CourseID": "sample string 2",
            "NameIS": "Vefforritun",
            "NameEN": "Web Programming",
            "DateBegin": "2014-03-17T22:21:39.8295436+00:00",
            "DateEnd": "2014-03-17T22:21:39.8295436+00:00"
        },
        {
            "ID": 3,
            "CourseID": "sample string 2",
            "NameIS": "Stýrikerfi",
            "NameEN": "Operating Systems",
            "DateBegin": "2014-03-17T22:21:39.8295436+00:00",
            "DateEnd": "2014-03-17T22:21:39.8295436+00:00"
        }
    ];

    var courseTeachersMock = [
        {
            "Username": "sample string 1",
            "FullName": "sample string 2",
            "SSN": "sample string 3",
            "Email": "sample string 4",
            "Role": "sample string 5",
            "ImageURL": "sample string 6"
        },
        {
            "Username": "sample string 1",
            "FullName": "sample string 2",
            "SSN": "sample string 3",
            "Email": "sample string 4",
            "Role": "sample string 5",
            "ImageURL": "sample string 6"
        },
        {
            "Username": "sample string 1",
            "FullName": "sample string 2",
            "SSN": "sample string 3",
            "Email": "sample string 4",
            "Role": "sample string 5",
            "ImageURL": "sample string 6"
        }
    ];

    var evaluationAnswersMock = [
        {
            "QuestionID": 1,
            "TeacherSSN": "sample string 2",
            "Value": "sample string 3"
        },
        {
            "QuestionID": 1,
            "TeacherSSN": "sample string 2",
            "Value": "sample string 3"
        },
        {
            "QuestionID": 1,
            "TeacherSSN": "sample string 2",
            "Value": "sample string 3"
        }
    ];

    var courseEvaluationsMock = {
        "ID": 1,
            "TemplateID": 2,
            "TitleIS": "sample string 3",
            "TitleEN": "sample string 4",
            "IntoTextIS": "sample string 5",
            "IntroTextEN": "sample string 6",
            "CourseQuestions": [
            {
                "ID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "ImageURL": "sample string 4",
                "Type": "sample string 5",
                "Answers": [
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                }
                ]
            },
            {
                "ID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "ImageURL": "sample string 4",
                "Type": "sample string 5",
                "Answers": [
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                }
                ]
            },
            {
                "ID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "ImageURL": "sample string 4",
                "Type": "sample string 5",
                "Answers": [
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                }
                ]
            }
        ],
            "TeacherQuestions": [
            {
                "ID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "ImageURL": "sample string 4",
                "Type": "sample string 5",
                "Answers": [
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                }
                ]
            },
            {
                "ID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "ImageURL": "sample string 4",
                "Type": "sample string 5",
                "Answers": [
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                }
                ]
            },
            {
                "ID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "ImageURL": "sample string 4",
                "Type": "sample string 5",
                "Answers": [
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                },
                {
                    "ID": 1,
                    "TextIS": "sample string 2",
                    "TextEN": "sample string 3",
                    "ImageURL": "sample string 4",
                    "Weight": 5
                }
                ]
            }
        ]
    };

    beforeEach(function (){
        module('EvaluationApp');
        inject(function(_ApiFactory_, _$httpBackend_, _$rootScope_) {
            ApiFactory = _ApiFactory_;
            httpMock = _$httpBackend_;
            rootScope = _$rootScope_.$new();
        });
    });

    afterEach(function() {
        httpMock.verifyNoOutstandingExpectation();
        httpMock.verifyNoOutstandingRequest();
    });

    it('should have all its functions', function() {
        expect(angular.isFunction(ApiFactory.getAllEvaluations)).toBe(true);
        expect(angular.isFunction(ApiFactory.getEvaluationById)).toBe(true);
        expect(angular.isFunction(ApiFactory.addEvaluation)).toBe(true);
    });

    it('should return an evaluation by id', function() {
        httpMock.when('GET', serviceUrl + 'api/v1/evaluations/1').respond(evaluationsMock[0]); 
        ApiFactory.getEvaluationById(1).then(function (data) {
            expect(data).toBeDefined; 
            expect(data.ID).toBe(1);
            expect(data.Status).toBe('sample string 1'); 
            expect(data.EndDate).toBe('2014-03-16T14:42:25.2215468+00:00'); 
        });
        httpMock.expectGET(serviceUrl + 'api/v1/evaluations/1').respond(evaluationsMock[0]);
        httpMock.flush(); 
    });

    it('should add an evaluation' , function () { 
        httpMock.when('POST', serviceUrl + 'api/v1/evaluations').respond(200);
        var newEvaluation = { 
            "TemplateID": 1, 
            "StartDate": "2014-03-16T14:42:19.7770528+00:00",
            "EndDate": "2014-03-16T14:42:19.7770528+00:00" 
        };
        ApiFactory.addEvaluation(newEvaluation).then(function(data) {
            //TODO: Test more harder
            expect(data).toBeDefined;
        }); 
        httpMock.expectPOST(serviceUrl + 'api/v1/evaluations');
        httpMock.flush(); 
    });

    it('should add an evaluation' , function () { 
        httpMock.when('POST', serviceUrl + 'api/v1/evaluations').respond(200);
        var newEval = { 
            "TemplateID": 1, 
            "StartDate": "2014-03-16T14:42:19.7770528+00:00",
            "EndDate": "2014-03-16T14:42:19.7770528+00:00" 
        };
        ApiFactory.newEvaluation(newEval.TemplateID, newEval.StartDate, newEval.EndDate).then(function(data) {
            //TODO: Test more harder
            expect(data).toBeDefined;
        }); 
        httpMock.expectPOST(serviceUrl + 'api/v1/evaluations');
        httpMock.flush(); 
    });

    it('getUser() should return empty string when getUser is called without login', function() {
        expect(ApiFactory.getUser()).toBe("");
        expect(ApiFactory.getUser()).toBeDefined;
    });

    it('should be able to log a person in', function() {
        httpMock.when('POST', serviceUrl + 'api/v1/login').respond({User: "jakobt12", Token: "xxx"});
        ApiFactory.login(user, pass).then(function(data){
            expect(ApiFactory.getUser()).toBe(data.User);
            expect(data.User).toBe('jakobt12'); /* Note this is the same as in our mock */

            expect(ApiFactory.getToken()).toBe(data.Token);
            expect(data.Token).toBe("xxx");
            
            expect(data).toBeDefined;
        });
        httpMock.expectPOST(serviceUrl + "api/v1/login").respond({User: "jakobt12", Token: "xxx"});
        httpMock.flush();
    });

    it('should getAllEvaluations and return resolved data', function () {
        httpMock.when('GET', serviceUrl + 'api/v1/evaluations').respond(evaluationsMock);
        ApiFactory.getAllEvaluations().then(function(data) {
            expect(data).toBeDefined;
            expect(data).toEqual(evaluationsMock);
        });
        httpMock.expectGET(serviceUrl + 'api/v1/evaluations').respond(evaluationsMock);
        httpMock.flush(); 
    });

    it('should return all evaluation the given student has', function () {
        httpMock.when('GET', serviceUrl + 'api/v1/my/evaluations').respond(myEvaluationsMock);
        ApiFactory.getMyEvaluations().then(function(data) {
            expect(data).toBeDefined;
            expect(data).toEqual(myEvaluationsMock);
        });
        httpMock.expectGET(serviceUrl + 'api/v1/my/evaluations').respond(myEvaluationsMock);
        httpMock.flush(); 
    });

    it('should be able to submit a template', function() { 
        httpMock.when('POST', serviceUrl + "api/v1/evaluationtemplates").respond(200); 
        ApiFactory.newTemplate({}).then(function(data) {
            expect(data).toBeDefined; 
            console.log("data: " + data);
        });
        httpMock.expectPOST(serviceUrl + "api/v1/evaluationtemplates").respond(200); 
        httpMock.flush();
    });

    it('should be able to get all templates', function() {
        httpMock.when('GET', serviceUrl + "api/v1/evaluationtemplates").respond(templatesMock);
        ApiFactory.getAllTemplates().then(function(data) {
            expect(data).toBeDefined(); 
            expect(data.length).toBe(3);
            expect(data[1].ID).toBe(2);
        });
        httpMock.expectGET(serviceUrl + "api/v1/evaluationtemplates")
        httpMock.flush();
    }); 

    it('should be able to get a template by its ID', function() {
        httpMock.when('GET', + serviceUrl + "api/v1/evaluationtemplates/1").respond(templatesMock[0]);
        ApiFactory.getTemplateById(1).then(function(data) {
            expect(data).toBeDefined(); 
            expect(data.ID).toBe(1); 
        });
        httpMock.expectGET(serviceUrl + "api/v1/evaluationtemplates/1").respond(templatesMock[0]); 
        httpMock.flush();
    });

    it('should be able to get all courses the logged in user is registered in', function() {
        httpMock.when('GET', serviceUrl + "api/v1/my/courses").respond(coursesMock);
        ApiFactory.getMyCourses().then(function(data) {
            expect(data).toBeDefined(); 
            expect(data.length).toBe(3);
            expect(data[1].ID).toBe(2);
        });
        httpMock.expectGET(serviceUrl + "api/v1/my/courses").respond(coursesMock);
        httpMock.flush();
    });

    it('should return a list of all teachers registered in a given course', function() {
        var semester = "V2014";
        var course = "1";

        httpMock.when('GET', serviceUrl + "api/v1/courses/" + course + "/" + semester + "/teachers").respond(courseTeachersMock);
        ApiFactory.getCourseTeacher(course, semester).then(function(data) {
            expect(data).toBeDefined(); 
            expect(data.length).toBe(3);
            expect(data[0].FullName).toBe("sample string 2");
        });
        httpMock.expectGET(serviceUrl + "api/v1/courses/" + course + "/" + semester + "/teachers").respond(courseTeachersMock);
        httpMock.flush();
    });

    it('should return a given evaluation in the given course', function() {
        var semester = "V2014";
        var course = "1";
        var evalID = "1";

        httpMock.when('GET', serviceUrl + "api/v1/courses/" + course + "/" + semester + "/evaluations/" + evalID).respond(courseEvaluationsMock);
        ApiFactory.getCourseEvaluation(course, semester, evalID).then(function(data) {
            expect(data).toBeDefined(); 
            expect(data).toEqual(courseEvaluationsMock);
        });
        httpMock.expectGET(serviceUrl + "api/v1/courses/" + course + "/" + semester + "/evaluations/" + evalID).respond(courseEvaluationsMock);
        httpMock.flush();
    });

    it('should save answers from the currently logged-in user in an evaluation in a given course', function() {
        var semester = "V2014";
        var course = "1";
        var evalID = "1";

        httpMock.when('POST', serviceUrl + "api/v1/courses/" + course + "/" + semester + "/evaluations/" + evalID).respond(200); 
        ApiFactory.saveAnswers(course, semester, evalID, evaluationAnswersMock).then(function(data) {
            expect(data).toBeDefined; 
            console.log("data: " + data);
        });
        httpMock.expectPOST(serviceUrl + "api/v1/courses/" + course + "/" + semester + "/evaluations/" + evalID).respond(200); 
        httpMock.flush();
    });
});
