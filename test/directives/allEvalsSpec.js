describe('myevals directive', function() {

    // we declare some global vars to be used in the tests
    var elm,        // our directive jqLite element
        scope;      // the scope where our directive is inserted
    var httpMock;
    var $compile;

    // load the modules we want to test
    beforeEach(module('EvaluationApp'));
    //beforeEach(module('template'));

    // before each test, creates a new fresh scope
    // the inject function interest is to make use of the angularJS
    // dependency injection to get some other services in our test
    // here we need $rootScope to create a new scope
    beforeEach(inject(function($httpBackend, $rootScope, _$compile_) {
        scope = $rootScope.$new();
        scope.$digest();
        $compile = _$compile_;
        httpMock = $httpBackend;
        httpMock.whenGET('templates/partials/myEvalsPartial.html');
        //httpMock = $httpBackend;
        //httpMock.whenGET('templates/partials/myEvalsPartial.html').passThrough();
        //elm = $compile('<my-evals></my-evals>')(scope);
        //scope.$digest();
    }));


    describe('initialisation', function() {
        // before each test in this block, generates a fresh directive
        beforeEach(function () {
            elm = $compile('<my-evals></my-evals>')(scope);
            angular.element(document.body).append(elm);
        });
        it('should have a div', function() {
            expect(elm.find('div').length).toEqual(0);
        });
    });
});
