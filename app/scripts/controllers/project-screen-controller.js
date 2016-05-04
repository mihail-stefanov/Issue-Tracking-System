angular.module('issueTrackingSystemApp')
    .controller('ProjectScreenController', ['$scope', '$routeParams', '$http', '$q', '$location', 'authorisationService', 'projectService', 'issueService', function ($scope, $routeParams, $http, $q, $location, authorisationService, projectService, issueService) {
        
        $scope.goToDashboard = function () {
            $location.url('/');
        };
        
        $scope.logout = function() {
            authorisationService.logout();
            $location.url('/');
        }
        
        $scope.issuesEmpty = false;
        
        $scope.projectId = $routeParams.projectId;
        
        $scope.obtainData = function () {
            
            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.currentProject = projectService.getProjectById({
                projectId: $scope.projectId
            });
            
            $scope.currentProjectIssues = issueService.getIssuesByProjectId({
                projectId: $scope.projectId
            });
        }
        
        $scope.obtainData();
        
        $q.all([
            $scope.currentProject.$promise, 
            $scope.currentProjectIssues.$promise
        ]).then(function() {
                        
            var convertToStringOfNames = function(arrayOfObjects) {
                var names = '';
                
                arrayOfObjects.forEach(function(obj, index, array) {
                    if (index < array.length - 1) {
                        names += obj.Name + ', ';
                    } else {
                        names += obj.Name;
                    }
                });
                
                return names;
            };
            
            $scope.currentProjectLabels = convertToStringOfNames($scope.currentProject.Labels);
            $scope.currentProjectPriorities = convertToStringOfNames($scope.currentProject.Priorities);
            
            // Checking if there are any relevant issues

            if ($scope.currentProjectIssues.length == 0) {
                $scope.issuesEmpty = true;
            }
        });
        
        console.log($scope.currentProject);
        
    }]);