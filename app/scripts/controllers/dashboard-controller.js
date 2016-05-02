angular.module('issueTrackingSystemApp')
    .controller('DashboardController', ['$q', '$scope', 'authorisationService', 'projectService', 'issueService', function ($q, $scope, authorisationService, projectService, issueService) {

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

        // Obtaining only the projects the user has an assigned issue to, or the ones the user is the leared of
        $q.all([
            $scope.fullProjectsCollection.$promise,
            $scope.myIssuesCollection.$promise
        ]).then(function () {
            $scope.myProjectsCollection = {};
            
            // Adding projects the user is assigned to
            $scope.myIssuesCollection.Issues.forEach(function(issue) {
                $scope.myProjectsCollection[issue.Project.Id] = issue.Project.Name;
            });
            
            // Adding projects the user is the lead of
            
            var currentUserName = authorisationService.getCurrentUser();
            
            $scope.fullProjectsCollection.Projects.forEach(function(project) {
                if (project.Lead.Username == currentUserName.userName) {
                    $scope.myProjectsCollection[project.Id] = project.Name;
                }
            });
        });
}]);