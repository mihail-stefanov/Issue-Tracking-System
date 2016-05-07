angular.module('issueTrackingSystemApp')
    .controller('IssueScreenController', ['$scope', '$routeParams', '$http', '$location', '$q', 'userService', 'issueService', 'projectService', 'authorisationService', function ($scope, $routeParams, $http, $location, $q, userService, issueService, projectService, authorisationService) {

        // Header information

        $scope.currentUser = userService.getCurrentUserCredentials();

        $scope.goToDashboard = function () {
            $location.url('/');
        };

        $scope.issueId = $routeParams.issueId;

        $scope.editCurrentIssue = function () {
            $location.url('issues/' + $scope.issueId + '/edit/');
        };

        $scope.logout = function () {
            authorisationService.logout();
            $location.url('/');
        };
        
        $scope.obtainData = function () {
            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.currentIssue = issueService.getIssueById({
                issueId: $scope.issueId
            });
        };

        $scope.obtainData();
        
        $q.when($scope.currentIssue.$promise).then(function() {
            
            $scope.currentProject = projectService.getProjectById({
                projectId: $scope.currentIssue.Project.Id
            });
            
            $q.when($scope.currentProject.$promise).then(function () {
                
                // Checking if user is leader
                
                if ($scope.currentProject.Lead.Username == $scope.currentUser.userName) {
                    $scope.isLead = true;
                }
                
                // Checking if user is admin or assignee
        
                $scope.getCurrentUserInfo = userService.getCurrentUserInfo().$promise.then(function(response) {
                    $scope.isAdmin = response.isAdmin;
                    console.log($scope.isAdmin);
                    
                    if ($scope.currentIssue.Assignee.Username == response.Username) {
                        $scope.isAssignee = true;
                    }
                    console.log($scope.isAssignee);
                });
                
            });
            
            $scope.goToProject = function () {
                $location.url('projects/' + $scope.currentIssue.Project.Id);
            }
            
            $scope.changeStatus = function (statusId) {
                issueService.changeIssueStatus({
                    issueId: $scope.issueId,
                    statusid: statusId
                }).$promise.then(function() {
                    $scope.obtainData();
                });
            };
            
            
            // Obtaining and showing issue comments
            
            $scope.obtainComments = function () {
                $scope.comments = issueService.getIssueComments({
                    issueId: $scope.issueId
                });
            };
            
            $scope.obtainComments();
            
            $scope.sendComment = function(commentText) {
                issueService.addIssueComment({
                    issueId: $scope.issueId
                },{
                    Text: commentText
                }).$promise.then(function () {
                    $scope.obtainComments();
                });
            };
        });
        

    }]);