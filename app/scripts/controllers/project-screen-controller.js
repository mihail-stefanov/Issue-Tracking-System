angular.module('issueTrackingSystemApp')
    .controller('ProjectScreenController', ['$scope', '$routeParams', '$http', '$q', '$location', 'authorisationService', 'projectService', function ($scope, $routeParams, $http, $q, $location, authorisationService, projectService) {
        
        $scope.goToDashboard = function () {
            $location.url('/');
        };
        
        $scope.projectId = $routeParams.projectId;
        
        $scope.obtainData = function () {
            
            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.currentProject = projectService.getProjectById({
                projectId: $scope.projectId
            });
        }
        
        $scope.obtainData();
        
        $q.when($scope.currentProject.$promise).then(function() {
                        
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
        });
        
        console.log($scope.currentProject);
        
    }]);