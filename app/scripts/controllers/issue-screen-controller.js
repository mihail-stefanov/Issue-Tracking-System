angular.module('issueTrackingSystemApp')
    .controller('IssueScreenController', ['$scope', '$routeParams', '$http', '$location', 'userService', 'issueService', 'authorisationService', function($scope, $routeParams, $http, $location, userService, issueService, authorisationService) {
        
        // Header information
        
        $scope.currentUser = userService.getCurrentUserCredentials();
        
        $scope.goToDashboard  = function () {
            $location.url('/');
        };
        
        $scope.issueId = $routeParams.issueId;
        
        $scope.editCurrentIssue = function() {
            $location.url('issues/' + $scope.issueId + '/edit/');
        }
        
        $scope.logout = function() {
            authorisationService.logout();
            $location.url('/');
        }
        
        $scope.currentIssue =         
            
        $scope.obtainData = function () {
            console.info('Issue data reobtained!');
            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.currentIssue = issueService.getIssueById({
                issueId: $scope.issueId
            });
        }
        
        $scope.obtainData();
        
    }]);