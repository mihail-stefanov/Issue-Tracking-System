angular.module('issueTrackingSystemApp')
    .controller('DashboardController', ['$scope', 'authorisationService', 'projectService', 'issueService', function ($scope, authorisationService, projectService, issueService) {

        $scope.projectsCollection = projectService.getProjects({
            filter: '',
            pageSize: '1000',
            pageNumber: '1'
        });

        $scope.myIssuesCollection = issueService.getIssues({
            orderBy: 'DueDate desc',
            pageSize: '1000',
            pageNumber: '1'
        });
}]);