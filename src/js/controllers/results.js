app.controller("ResultsController", [
    "$scope", "ApiFactory", "$location", "$routeParams",
    function($scope, ApiFactory, $location, $routeParams) {
        //Mock data
        
        $scope.evalID = $routeParams.evaluationID;
        //Chart data is an array of charts
        $scope.charts = [];
        $scope.data = {
            "ID": 1,
            "TemplateID": 2,
            "TemplateTitleIS": "sample string 3",
            "TemplateTitleEN": "sample string 4",
            "Courses": [
            {
                "ID": 1,
                "CourseID": "WEPO",
                "Semester": " string 3",
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
                        "AnswerTextIS": "What is?",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 10
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "Do you like cats?",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 3
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "Do you like dogs?",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    }
                    ]
                },
                {
                    "QuestionID": 2,
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
                        "AnswerTextIS": "Is the teacher cool?",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 5
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "What is 5+5?",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 7
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "Do you like the course?",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 1
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
                        "AnswerTextIS": "My mom is potato",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 3
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "What for my dad?",
                        "AnswerTextEN": "sample string 3",
                        "Weight": 4,
                        "Count": 0
                    },
                    {
                        "Answer": 1,
                        "AnswerTextIS": "So you think you can dance?",
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
        $scope.test = {};

        this.makeDataset = (function(course) {
            var charttmp = { datasets: [], labels: [] };
            var datatmp = [];
            for(var i = 0; i < $scope.data.Courses[course].Questions.length; i ++){
                for(var j = 0; j < $scope.data.Courses[course].Questions[i].OptionsResults.length; j++){
                   charttmp.labels.push($scope.data.Courses[course].Questions[i].OptionsResults[j].AnswerTextIS);
                   datatmp.push($scope.data.Courses[course].Questions[i].OptionsResults[j].Count);
                }
            }
            charttmp.datasets.push({
                data: datatmp, 
                fillColor : "rgba(151,187,205,0)",
                strokeColor : "#e67e22",
                pointColor : "rgba(151,187,205,0)",
                pointStrokeColor : "#e67e22",
            });
            return charttmp;
        });

        this.parseData = (function() {
            for(var i = 0;i < $scope.data.Courses.length; i++){
                $scope.charts.push(this.makeDataset(i));
            }
        });
        $scope.init = (function() {
            ApiFactory.getEvaluationById($scope.evalID).then(function(data) {
                $scope.test = data;
            });
        });
        $scope.init();
        this.parseData();
        $scope.chart = $scope.charts[0];
    }
]); 
