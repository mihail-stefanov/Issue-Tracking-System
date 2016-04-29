angular.module('issueTrackingSystemApp')
    .controller('AuthenticationController', ['$scope', '$rootScope', 'authorisationService', function ($scope, $rootScope, authorisationService) {
        
        $scope.login = function (userLoginData) {
            authorisationService.login(userLoginData,
                function () {
                    console.log('User logged in!');
                    console.log(sessionStorage['currentUser']);
                    $rootScope.initialScreenChoice = $rootScope.initialScreenOptions.dashboard;
                },
                function () {
                    console.log('User login failed!!!');
                });
        };
        
        $scope.register = function (userRegisterData) {
            authorisationService.register(userRegisterData,
                function () {
                    console.log('Registration successful!');
                
                    var userDataForLogin = {};
                    userDataForLogin.Username = userRegisterData.Email;
                    userDataForLogin.Password = userRegisterData.Password;
                
                    $scope.login(userDataForLogin);
                    
                },
                function () {
                    console.log('Registration failed!!!');
                })
        };
}]);