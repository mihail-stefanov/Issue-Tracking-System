angular.module('issueTrackingSystemApp')
    .controller('IssueScreenController', ['$scope', '$routeParams', '$http', '$location', '$q', 'userService', 'issueService', 'authorisationService', function ($scope, $routeParams, $http, $location, $q, userService, issueService, authorisationService) {

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
            
            $scope.comments = issueService.getIssueComments({
                issueId: $scope.issueId
            });
            
            
        });
        

    }]);