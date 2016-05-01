angular.module('issueTrackingSystemApp')
    .factory('projectService', ['$resource', 'authorisationService', function ($resource, authorisationService) {

        var projectResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/projects', {}, {
                get: {
                    method: 'GET',
                    headers: {
                        'Authorization': authorisationService.getAuthorisationToken()
                    }
                }
            }
        );

        return {
            getProjects: function (params, callback) {
                return projectResource.get(params, callback);
            }
        }

    }]);