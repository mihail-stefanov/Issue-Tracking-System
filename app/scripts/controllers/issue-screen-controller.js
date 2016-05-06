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
        
        $scope.noStatusesAvailable = false;

        $scope.obtainData = function () {
            console.info('Issue data reobtained!');
            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.currentIssue = issueService.getIssueById({
                issueId: $scope.issueId
            });
        }

        $scope.obtainData();
        
        $q.when($scope.currentIssue.$promise).then(function() {
            $scope.goToProject = function () {
                $location.url('projects/' + $scope.currentIssue.Project.Id);
            }
            
            if ($scope.currentIssue.AvailableStatuses.length == 0) {
                $scope.noStatusesAvailable = true;
            }
        });
        

    }]);