angular.module('issueTrackingSystemApp')
    .controller('LoginController', ['$scope', '$rootScope', 'authorisationService', function ($scope, $rootScope, authorisationService) {
        $scope.login = function (userData) {
            authorisationService.login(userData,
                function () {
                    console.log('User logged in!');
                    $rootScope.userData = userData;
                    $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.dashboard;
                },
                function () {
                    console.log('User login failed!!!');
                });
        };
}]);