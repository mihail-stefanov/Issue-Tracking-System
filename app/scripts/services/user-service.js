angular.module('issueTrackingSystemApp')
    .factory('userService', ['$resource', function ($resource) {
        
        var currentUserResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/users/me', {}, {
                get: {
                    method: 'GET'
                }
            }
        );
        
        var allUsersResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/users', {}, {
                get: {
                    method: 'GET'
                }
            }
        );
        
        return {
            getCurrentUserCredentials: function() {
                var loggedInUserCredentials = sessionStorage['currentUser'];
                if (loggedInUserCredentials != undefined) {
                    return JSON.parse(loggedInUserCredentials);
                } // TODO: Improve variable naming
            },
            
            getCurrentUserInfo: function(params, callback) {
                return currentUserResource.get(params, callback);
            },
            
            getAllUsers: function(params, callback) {
                return allUsersResource.get(params, callback);
            }
        };
    }]);





            
