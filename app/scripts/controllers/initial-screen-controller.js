angular.module('issueTrackingSystemApp')
    .controller('InitialScreenController', ['$rootScope', function ($rootScope) {

        $rootScope.initialScreenOptions = {
            welcome: 'welcome',
            login: 'login',
            register: 'register',
            dashboard: 'dashboard'
        }; // TODO: Could be moved as a constant

        $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.welcome;
        
        $rootScope.showLoginForm = function() {
            $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.login;
        };
        
        $rootScope.showRegisterForm = function() {
            $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.register;
        };
        
}]);