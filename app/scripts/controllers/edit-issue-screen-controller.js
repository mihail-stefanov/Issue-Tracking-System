angular.module('issueTrackingSystemApp')
    .controller('EditIssueScreenController', ['$scope', '$routeParams', '$http', '$q', '$location', 'authorisationService', 'issueService', 'projectService', 'userService', function ($scope, $routeParams, $http, $q, $location, authorisationService, issueService, projectService, userService) {
   
        // Title buttons and info
        
        $scope.goToDashboard = function () {
            $location.url('/');
        };
        
        $scope.issueId = $routeParams.issueId;
        
        $scope.goToIssue = function () {
            $location.url('issues/' + $scope.issueId);
        };
        
        $scope.logout = function() {
            authorisationService.logout();
            $location.url('/');
        }
        
        // Obtaining the issue details
        
        $scope.obtainData = function () {
            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.currentIssue = issueService.getIssueById({
                issueId: $scope.issueId
            });
        };
        
        $scope.obtainData();
        
        // Moving relevant data into an object used for put request
        
        $scope.editedIssue = {};
        
        $q.when($scope.currentIssue.$promise).then(function() {
            
            $scope.editedIssue = JSON.parse(JSON.stringify($scope.currentIssue));
            
            // Obtaining potential assignees and priorities
            
            $scope.fullUserCollection = userService.getAllUsers();
            $scope.currentProject = projectService.getProjectById({
                projectId: $scope.currentIssue.Project.Id
            });
            
            $q.all([
                $scope.fullUserCollection.$promise,
                $scope.currentProject.$promise
            ]).then(function () {
                
                // Pre-selecting the current assignee
                $scope.fullUserCollection.forEach(function (user, index, array) {
                    if ($scope.editedIssue.Assignee.Username == user.Username) {
                        $scope.issueSelectedAssignee = $scope.fullUserCollection[index];
                    }
                });
                
                // Obtaining the list of available priorities
                $scope.availablePriorities = $scope.currentProject.Priorities;
                
                // Pre-selecting the current issue priority
                $scope.availablePriorities.forEach(function (priority, index, array) {
                    if ($scope.editedIssue.Priority.Name == priority.Name) {
                        $scope.issueSelectedPriority = $scope.availablePriorities[index];
                    }
                });
                
            });
            
            $scope.addLabel = function () {
                $scope.editedIssue.Labels.push({Name: ""});
            };
            
            
            $scope.saveCurrentIssue = function() {
                
                var issueToSend = {};
                
                issueToSend.Title = $scope.editedIssue.Title;
                issueToSend.Description = $scope.editedIssue.Description;
                issueToSend.DueDate = $scope.editedIssue.DueDate;
                issueToSend.AssigneeId = $scope.issueSelectedAssignee.Id;
                issueToSend.PriorityId = $scope.issueSelectedPriority.Id;
                issueToSend.labels = [];

                $scope.editedIssue.Labels.forEach(function (labelObj, index, array) {
                    issueToSend.labels.push({Name:labelObj.Name});
                });
                
                console.log(issueToSend);
                
                issueService.editIssue({
                    issueId: $scope.issueId
                }, issueToSend).$promise.then($scope.goToIssue);
            }
        });
        
    }]);