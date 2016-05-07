angular.module('issueTrackingSystemApp', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'templates/initial-screen.html',
            controller: 'InitialScreenController'
        });
    
        $routeProvider.when('/profile/password', {
            templateUrl: 'templates/change-password-screen.html',
            controller: 'ChangePasswordScreenController'
        });
    
        $routeProvider.when('/projects', {
            templateUrl: 'templates/all-projects-screen.html',
            controller: 'AllProjectsScreenController'
        });
        
        $routeProvider.when('/projects/add', {
            templateUrl: 'templates/all-projects-screen.html',
            controller: 'AllProjectsScreenController'
        });
    
        $routeProvider.when('/projects/:projectId', {
            templateUrl: 'templates/project-screen.html',
            controller: 'ProjectScreenController'
        });
    
        $routeProvider.when('/projects/:projectId/edit', {
            templateUrl: 'templates/edit-project-screen.html',
            controller: 'EditProjectScreenController'
        });
    
        $routeProvider.when('/projects/:projectId/add-issue', {
            templateUrl: 'templates/project-screen.html',
            controller: 'ProjectScreenController'
        });
    
        $routeProvider.when('/issues/:issueId', {
            templateUrl: 'templates/issue-screen.html',
            controller: 'IssueScreenController'
        });
    
        $routeProvider.when('/issues/:issueId/edit', {
            templateUrl: 'templates/edit-issue-screen.html',
            controller: 'EditIssueScreenController'
        });
    
        $routeProvider.otherwise({
            redirectTo: '/',
            controller: 'InitialScreenController'
        });

    });