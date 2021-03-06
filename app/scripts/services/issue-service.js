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
        
        var issueByIdResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/issues/:issueId', {}, {
                get: {
                    method: 'GET'
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
        
        var changeIssueStatusResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/issues/:issueId/changestatus', {}, {
                update: {
                    method: 'PUT',
                    isArray: true
                }
            }
        );
        
        var editIssueResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/issues/:issueId', {}, {
                update: {
                    method: 'PUT'
                }
            }
        );
        
        var issueCommentsResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/issues/:issueId/comments', {}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            }
        );
        
        var addIssueCommentResource = $resource(
            'http://softuni-issue-tracker.azurewebsites.net/issues/:issueId/comments', {}, {
                save: {
                    method: 'POST',
                    isArray: true
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
            
            getIssueById: function (params, callback) {
                return issueByIdResource.get(params, callback);
            },
            
            addNewIssue: function (params, dataToSend) {
                return addIssueResource.save(params, dataToSend);
            },
            
            changeIssueStatus: function (params, dataToSend) {
                return changeIssueStatusResource.update(params, dataToSend);
            },
            
            editIssue: function (params, dataToSend) {
                return editIssueResource.update(params, dataToSend);
            },
            
            getIssueComments: function (params, callback) {
                return issueCommentsResource.query(params, callback);
            },
            
            addIssueComment: function (params, dataToSend) {
                return addIssueCommentResource.save(params, dataToSend);
            }
            
        }

    }]);