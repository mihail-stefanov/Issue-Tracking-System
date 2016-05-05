angular.module('issueTrackingSystemApp')
    .controller('EditProjectScreenController', ['$scope', '$routeParams', '$http', '$q', '$location', 'authorisationService', 'projectService', function ($scope, $routeParams, $http, $q, $location, authorisationService, projectService) {
        
        $scope.goToDashboard = function () {
            $location.url('/');
        };
        
        $scope.goToProject = function () {
            $location.url('projects/' + $scope.projectId);
        };
        
        $scope.logout = function() {
            authorisationService.logout();
            $location.url('/');
        }
        
        // Obtaining the project details
        
        $scope.projectId = $routeParams.projectId;
        
        $scope.obtainData = function () {
            
            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.currentProject = projectService.getProjectById({
                projectId: $scope.projectId
            });
        }
        
        $scope.obtainData(); // TODO: Consider refactoring code duplications
        
        // Moving relevant data into an object used for put request
        
        $scope.editedProject = {};
        
        $q.when($scope.currentProject.$promise).then(function() {
            
            $scope.editedProject = JSON.parse(JSON.stringify($scope.currentProject));
            console.log($scope.editedProject);
            
            $scope.addLabel = function () {
                $scope.editedProject.Labels.push({Name: ""});
            };
            
            $scope.addPriority = function () {
                $scope.editedProject.Priorities.push({Name: ""});
            };
            
            
            $scope.saveCurrentProject = function() {
                
                var projectToSend = {};
                
                projectToSend.Name = $scope.editedProject.Name;
                projectToSend.Description = $scope.editedProject.Description;
                projectToSend.LeadId = $scope.editedProject.Lead.Id;
                projectToSend.Labels = [];
                projectToSend.Priorities = [];
                
                $scope.editedProject.Labels.forEach(function (labelObj, index, array) {
                    projectToSend.Labels.push(labelObj.Name);
                });
                
                $scope.editedProject.Priorities.forEach(function (priorityObj, index, array) {
                    projectToSend.Priorities.push(priorityObj.Name);
                });
                
                console.info($scope.editedProject.Labels);
                console.warn(projectToSend.Labels);
                
                projectService.editProject({
                    projectId: $scope.projectId
                }, projectToSend);
            }
        });
        
    }]);