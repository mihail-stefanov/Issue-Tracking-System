angular.module('issueTrackingSystemApp')
    .factory('authorisationService', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {
        return {

            login: function (userLoginData, success, error) {

                userLoginData.grant_type = 'password';

                var httpRequest = {
                    method: 'POST',
                    url: 'http://softuni-issue-tracker.azurewebsites.net/api/Token',
                    data: $httpParamSerializerJQLike(userLoginData),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                // TODO: Change success to 'then' as 'success' is deprecated
                $http(httpRequest)
                    .success(function (response) {
                        sessionStorage['currentUser'] = JSON.stringify(response);
                        success();
                    })
                    .error(error);
            },

            register: function (userRegisterData, success, error) {
                var httpRequest = {
                    method: 'POST',
                    url: 'http://softuni-issue-tracker.azurewebsites.net/api/Account/Register',
                    data: userRegisterData
                };

                $http(httpRequest).success(function (response) {
                    success();
                }).error(error);
            },
            
            getCurrentUser: function() {
                var loggedInUser = sessionStorage['currentUser'];
                if (loggedInUser != undefined) {
                    return JSON.parse(loggedInUser);
                } // TODO: Improve variable naming
            },
            
            getAuthorisationToken: function() {
                var loggedInUser = this.getCurrentUser();
                var authorisationToken = 'Bearer ' + loggedInUser.access_token;
                return authorisationToken;
            },

            logout: function () {
                delete sessionStorage['currentUser'];
            }
        };
    }]);