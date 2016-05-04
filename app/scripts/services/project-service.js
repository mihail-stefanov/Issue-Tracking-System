angular.module('issueTrackingSystemApp')
    .factory('projectService', ['$resource', 'authorisationService', function ($resource, authorisationService) {

        var projectResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/projects', {}, {
                get: {
                    method: 'GET'
                }
            }
        );
        
        var projectByIdResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/projects/:projectId', {}, {
                get: {
                    method: 'GET'
                }
            }
        );

        return {
            getProjects: function (params, callback) {
                return projectResource.get(params, callback);
            },
            
            getProjectById: function (params, callback) {
                return projectByIdResource.get(params, callback);
            }
        }

    }]);