describe('Testing the evaluation controller', function () {

    var $scope = null;
    var ctrl = null;

    beforeEach(module('evaluationApp'));

    beforeEach(inject(function($rootScope, $controller){
        $scope = $rootScope.$new();

        ctrl = $controller('evalutaionController', {
            $scope: $scope;
        });
    }));

    it("should test something", function() {
        expect($scope.name).toEqual('World');
    });
});
