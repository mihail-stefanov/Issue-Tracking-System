angular.module('issueTrackingSystemApp')
    .factory('issueService', ['$resource', 'authorisationService', function ($resource, authorisationService) {

        var issueResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/issues/me', {}, {
                get: {
                    method: 'GET'
                }
            }
        );
        
        var issueByProjectIdResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/projects/:projectId/issues', {}, {
                query: {
                    method: 'GET',
                    isArray:true
                }
            }
        );
        
        var addIssueResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/issues', {}, {
                save: {
                    method: 'POST'
                }
            }
        );

        return {
            getIssues: function (params, callback) {
                return issueResource.get(params, callback);
            },
            
            getIssuesByProjectId: function (params, callback) {
                return issueByProjectIdResource.query(params, callback);
            },
            
            addNewIssue: function (params, dataToSend) {
                return addIssueResource.save(params, dataToSend);
            }
        }

    }]);