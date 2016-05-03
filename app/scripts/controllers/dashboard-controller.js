angular.module('issueTrackingSystemApp')
    .controller('DashboardController', ['$http', '$q', '$scope', 'authorisationService', 'projectService', 'issueService', 'paginationService', function ($http, $q, $scope, authorisationService, projectService, issueService, paginationService) {

        $scope.projectsEmpty = false;
        $scope.issuesEmpty = false;

        $scope.obtainData = function () {

            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.fullProjectsCollection = projectService.getProjects({
                filter: '',
                pageSize: '1000',
                pageNumber: '1'
            });

            $scope.myIssuesCollection = issueService.getIssues({
                orderBy: 'DueDate desc',
                pageSize: '1000',
                pageNumber: '1'
            });
        };

        $scope.obtainData();

        // Obtaining only the projects the user has an assigned issue to, or the ones the user is the leared of
        $q.all([
            $scope.fullProjectsCollection.$promise,
            $scope.myIssuesCollection.$promise
        ]).then(function () {
            $scope.myProjectsCollection = {};

            // Adding projects the user is assigned to
            $scope.myIssuesCollection.Issues.forEach(function (issue) {
                $scope.myProjectsCollection[issue.Project.Id] = issue.Project.Name;
            });

            // Adding projects the user is the lead of

            var currentUserName = authorisationService.getCurrentUser();

            $scope.fullProjectsCollection.Projects.forEach(function (project) {
                if (project.Lead.Username == currentUserName.userName) {
                    $scope.myProjectsCollection[project.Id] = project.Name;
                }
            });

            // Checking if there are any relevant projects or issues

            if ($scope.myIssuesCollection.Issues.length == 0) {
                $scope.issuesEmpty = true;
            }

            if (Object.keys($scope.myProjectsCollection).length == 0) {
                $scope.projectsEmpty = true;
            }

            // Setting up the pagination
            paginationService.config($scope.myIssuesCollection.Issues, 5);

            $scope.pages = paginationService.getPagesArray();

            $scope.selectPage = paginationService.selectPage;

            $scope.$watch(paginationService.getDataToDisplay, function () {
                $scope.dataSubset = paginationService.getDataToDisplay();
            });
        });
}]);