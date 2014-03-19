describe('Testing the results controller, it',function() {
    var rootScope, ctrl, ApiFactory, deferred;
    var chartMock = {
        labels : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0)",
                strokeColor : "#e67e22",
                pointColor : "rgba(151,187,205,0)",
                pointStrokeColor : "#e67e22",
                data : [4, 3, 5, 4, 6]
            },
            {
                fillColor : "rgba(151,187,205,0)",
                strokeColor : "#f1c40f",
                pointColor : "rgba(151,187,205,0)",
                pointStrokeColor : "#f1c40f",
                data : [8, 3, 2, 5, 4]
            }
        ], 
    };
    var dataDummy = {
        "ID": 1,
        "TemplateID": 2,
        "TemplateTitleIS": "sample string 3",
        "TemplateTitleEN": "sample string 4",
        "Courses": [
        {
            "ID": 1,
            "CourseID": "sample string 2",
            "Semester": "sample string 3",
            "CourseNameIS": "sample string 4",
            "CourseNameEN": "sample string 5",
            "Questions": [
            {
                "QuestionID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "TeacherSSN": "sample string 4",
                "Type": "sample string 5",
                "TextResults": [
                    "sample string 1",
                    "sample string 2",
                    "sample string 3"
                ],
                "OptionsResults": [
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                }
                ]
            },
            {
                "QuestionID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "TeacherSSN": "sample string 4",
                "Type": "sample string 5",
                "TextResults": [
                    "sample string 1",
                "sample string 2",
                "sample string 3"
                    ],
                "OptionsResults": [
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                }
                ]
            },
            {
                "QuestionID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "TeacherSSN": "sample string 4",
                "Type": "sample string 5",
                "TextResults": [
                    "sample string 1",
                "sample string 2",
                "sample string 3"
                    ],
                "OptionsResults": [
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                }
                ]
            }
            ]
        },
        {
            "ID": 1,
            "CourseID": "sample string 2",
            "Semester": "sample string 3",
            "CourseNameIS": "sample string 4",
            "CourseNameEN": "sample string 5",
            "Questions": [
            {
                "QuestionID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "TeacherSSN": "sample string 4",
                "Type": "sample string 5",
                "TextResults": [
                    "sample string 1",
                "sample string 2",
                "sample string 3"
                    ],
                "OptionsResults": [
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                }
                ]
            },
            {
                "QuestionID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "TeacherSSN": "sample string 4",
                "Type": "sample string 5",
                "TextResults": [
                    "sample string 1",
                "sample string 2",
                "sample string 3"
                    ],
                "OptionsResults": [
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                }
                ]
            },
            {
                "QuestionID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "TeacherSSN": "sample string 4",
                "Type": "sample string 5",
                "TextResults": [
                    "sample string 1",
                "sample string 2",
                "sample string 3"
                    ],
                "OptionsResults": [
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                }
                ]
            }
            ]
        },
        {
            "ID": 1,
            "CourseID": "sample string 2",
            "Semester": "sample string 3",
            "CourseNameIS": "sample string 4",
            "CourseNameEN": "sample string 5",
            "Questions": [
            {
                "QuestionID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "TeacherSSN": "sample string 4",
                "Type": "sample string 5",
                "TextResults": [
                    "sample string 1",
                "sample string 2",
                "sample string 3"
                    ],
                "OptionsResults": [
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                }
                ]
            },
            {
                "QuestionID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "TeacherSSN": "sample string 4",
                "Type": "sample string 5",
                "TextResults": [
                    "sample string 1",
                "sample string 2",
                "sample string 3"
                    ],
                "OptionsResults": [
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                }
                ]
            },
            {
                "QuestionID": 1,
                "TextIS": "sample string 2",
                "TextEN": "sample string 3",
                "TeacherSSN": "sample string 4",
                "Type": "sample string 5",
                "TextResults": [
                    "sample string 1",
                "sample string 2",
                "sample string 3"
                    ],
                "OptionsResults": [
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                },
                {
                    "Answer": 1,
                    "AnswerTextIS": "sample string 2",
                    "AnswerTextEN": "sample string 3",
                    "Weight": 4,
                    "Count": 5
                }
                ]
            }
            ]
        }
        ]
    }

    beforeEach(function(){
        module('EvaluationApp');
        inject(function(_$rootScope_, _$controller_, _$q_) {
            /* This mocks the ApiFactory service */
            ApiFactory = {
                getEvaluationsById: function(evalID) {
                    deferred = _$q_.defer();
                    return deferred.promise;
                }
            };
            /* Spy on the service and call it */
            spyOn(ApiFactory, 'getEvaluationsById').andCallThrough();
            rootScope = _$rootScope_.$new();
            /* This mocks the controller */
            ctrl = _$controller_('ResultsController', {
                $scope: rootScope,
                ApiFactory: ApiFactory,
            });
        });
    });

    it('should initialize correctly', function(){
        //TODO: Data dummy will call apifactory
        rootScope.init();
        expect(rootScope.chart).toEqual(chartMock);
        expect(rootScope.data).toEqual(dataDummy);
    });

    it('should parse data correctly', function(){
    });
});
