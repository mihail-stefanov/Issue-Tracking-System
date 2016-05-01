angular.module('issueTrackingSystemApp')
    .controller('InitialScreenController', ['$rootScope', 'authorisationService', function ($rootScope, authorisationService) {

        $rootScope.initialScreenOptions = {
            welcome: 'welcome',
            login: 'login',
            register: 'register',
            dashboard: 'dashboard'
        }; // TODO: Could be moved as a constant

        if (sessionStorage['currentUser'] == undefined) {
            $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.welcome; 
        } else {
            $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.dashboard;
        }
        
        // TODO: to be made conditional if using localStorage;
        
        $rootScope.showLoginForm = function() {
            $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.login;
        };
        
        $rootScope.showRegisterForm = function() {
            $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.register;
        };
        
        $rootScope.logout = function() {
            authorisationService.logout();
            $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.welcome;
        };
}]);