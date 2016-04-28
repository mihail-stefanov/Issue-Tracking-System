angular.module('issueTrackingSystemApp')
    .controller('InitialScreenController', ['$scope', function ($scope) {

        $scope.initialScreenOptions = {
            welcome: 'welcome',
            login: 'login',
            register: 'register',
            dashboard: 'dashboard'
        }; // TODO: Could be moved as a constant

        $scope.initialScreenChoice = $scope.initialScreenOptions.welcome;
        
        $scope.showLoginForm = function() {
            $scope.initialScreenChoice = $scope.initialScreenOptions.login;
        };
        
        $scope.showRegisterForm = function() {
            $scope.initialScreenChoice = $scope.initialScreenOptions.register;
        };
        
}]);