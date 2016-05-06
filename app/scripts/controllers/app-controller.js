angular.module('issueTrackingSystemApp').controller('AppController', ['$scope', 'authorisationService', 'userService', function ($scope, authorisationService, userService) {
    $scope.authorisationService = authorisationService;
    $scope.userService = userService;
}]);