angular.module('issueTrackingSystemApp').controller('AppController', ['$scope', 'authorisationService', function ($scope, authorisationService) {
    
    $scope.authorisationService = authorisationService;
    
}]);