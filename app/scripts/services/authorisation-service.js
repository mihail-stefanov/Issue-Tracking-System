angular.module('issueTrackingSystemApp')
    .factory('authorisationService', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {
        return {

            login: function (userData, success, error) {

                userData.grant_type = 'password';

                var httpRequest = {
                    method: 'POST',
                    url: 'http://softuni-issue-tracker.azurewebsites.net/api/Token',
                    data: $httpParamSerializerJQLike(userData),
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

            register: function (userData, success, error) {
                var httpRequest = {
                    method: 'POST',
                    url: 'http://softuni-issue-tracker.azurewebsites.net/api/Account/Register',
                    data: userData
                };

                $http(httpRequest).success(function (response) {
                    // TODO: Log in user on success
                })
            },

            logout: function () {
                delete sessionStorage['currentUser'];
            }
        };
    }]);