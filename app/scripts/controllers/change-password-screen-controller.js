angular.module('issueTrackingSystemApp')
    .controller('ChangePasswordScreenController', ['$scope', '$location', 'authorisationService', function ($scope, $location, authorisationService) {

        $scope.goToDashboard = function () {
            $location.url('/');
        };

        $scope.logout = function () {
            authorisationService.logout();
            $location.url('/');
        };

        $scope.saveChangedPassword = function (changePasswordData) {

            authorisationService.changePassword(changePasswordData, function () {
                console.info("Password successfully changed!");
                $scope.goToDashboard();
            }, function () {
                console.warn("Password change failed!!!");
            });
        };

    }]);