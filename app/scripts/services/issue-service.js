angular.module('issueTrackingSystemApp')
    .factory('issueService', ['$resource', 'authorisationService', function ($resource, authorisationService) {

        var issueResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/issues/me', {}, {
                get: {
                    method: 'GET'
                }
            }
        );

        return {
            getIssues: function (params, callback) {
                return issueResource.get(params, callback);
            }
        }

    }]);