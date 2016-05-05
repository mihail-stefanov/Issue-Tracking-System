angular.module('issueTrackingSystemApp', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'templates/initial-screen.html',
            controller: 'InitialScreenController'
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
    
        $routeProvider.otherwise({
            redirectTo: 'templates/initial-screen.html',
            controller: 'InitialScreenController'
        });

    });