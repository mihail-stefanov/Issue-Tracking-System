angular.module('issueTrackingSystemApp', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'templates/initial-screen.html',
            controller: 'InitialScreenController'
        });
    
        $routeProvider.otherwise({
            redirectTo: 'templates/initial-screen.html',
            controller: 'InitialScreenController'
        });

    });