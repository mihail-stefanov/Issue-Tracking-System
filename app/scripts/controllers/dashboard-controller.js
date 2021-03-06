angular.module('issueTrackingSystemApp')
    .controller('DashboardController', ['$http', '$location', '$q', '$scope', 'authorisationService', 'userService', 'projectService', 'issueService', 'paginationService', function ($http, $location, $q, $scope, authorisationService, userService, projectService, issueService, paginationService) {

        // Checking if user is admin
        
        $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();
        
        $scope.getCurrentUserInfo = userService.getCurrentUserInfo().$promise.then(function(response) {
            $scope.isAdmin = response.isAdmin;
            console.log($scope.isAdmin);
        });
        
        
        // Setting links and obtaining data
        
        $scope.showAllProjects = function () {
            $location.url('projects/');
        };
        
        $scope.addProject = function () {
            $location.url('projects/add');
        };
        
        $scope.goToSettings = function () {
            $location.url('profile/password/');
        };
        
        $scope.goToProject = function (projectId) {
            $location.url('projects/' + projectId);
        };
        
        $scope.goToIssue = function (issueId) {
            $location.url('issues/' + issueId);
        }
        
        $scope.projectsEmpty = false;
        $scope.issuesEmpty = false;

        $scope.obtainData = function () {

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

            var currentUserName = userService.getCurrentUserCredentials();

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
            
            $scope.projectPaginator = paginationService.getPaginatorInstance();
            $scope.issuePaginator = paginationService.getPaginatorInstance();
            
            // Issues pagination
            
            $scope.issuePaginator.config($scope.myIssuesCollection.Issues, 5);
            $scope.issuePages = $scope.issuePaginator.getPagesArray();
            $scope.selectIssuePage = $scope.issuePaginator.selectPage;
            $scope.$watch($scope.issuePaginator.getDataToDisplay, function () {
                $scope.issueDataSubset = $scope.issuePaginator.getDataToDisplay();
            });
            
            // Project pagination
            
            $scope.projectPaginator.config($scope.myProjectsCollection, 5);
            $scope.projectPages = $scope.projectPaginator.getPagesArray();
            $scope.selectProjectPage = $scope.projectPaginator.selectPage;
            $scope.$watch($scope.projectPaginator.getDataToDisplay, function () {
                $scope.projectDataSubset = $scope.projectPaginator.getDataToDisplay();
            });
        });
}]);