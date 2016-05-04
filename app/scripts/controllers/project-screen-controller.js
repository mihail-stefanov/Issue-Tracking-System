angular.module('issueTrackingSystemApp')
    .controller('ProjectScreenController', ['$scope', '$routeParams', '$http', 'authorisationService', 'projectService', function ($scope, $routeParams, $http, authorisationService, projectService) {
        $scope.projectId = $routeParams.projectId;
        
        $scope.obtainData = function () {
            
            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.currentProject = projectService.getProjectById({
                projectId: $scope.projectId
            });
        }
        
        $scope.obtainData();
        
        console.log($scope.currentProject);
        
    }]);