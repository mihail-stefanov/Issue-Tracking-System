angular.module('issueTrackingSystemApp')
    .factory('projectService', ['$resource', '$http', '$httpParamSerializerJQLike', 'authorisationService', function ($resource, $http, $httpParamSerializerJQLike, authorisationService) {

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
        
        var addProjectResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/projects', {}, {
                save: {
                    method: 'POST'
                }
            }
        );
        
        var editProjectResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/projects/:projectId', {}, {
                update: {
                    method: 'PUT'
                }
            }
        );

        return {
            getProjects: function (params, callback) {
                return projectResource.get(params, callback);
            },
            
            getProjectById: function (params, callback) {
                return projectByIdResource.get(params, callback);
            }, 
            
            addProject: function (params, dataToSend) {
                return addProjectResource.save(params, dataToSend);
            },
            
            editProject: function (params, dataToSend) {
                return editProjectResource.update(params, dataToSend);
            }
        }

    }]);