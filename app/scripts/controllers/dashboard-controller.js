angular.module('issueTrackingSystemApp')
    .controller('DashboardController', ['$scope', 'authorisationService', 'projectService', function ($scope, authorisationService, projectService) {
        
        $scope.projectsCollection = projectService.getProjects({
            filter: '',
            pageSize: '1000',
            pageNumber: '1'
        });
        
        $scope.issues = [
            {
                title: 'First Issue',
                description: 'System specifics go here',
                project: 'First project',
                dueDate: '10-10-2016'
            },
            {
                title: 'Another Issue',
                description: 'System specifics go here again',
                project: 'Second project',
                dueDate: '10-05-2016'
            },
            {
                title: 'The most important Issue',
                description: 'System specifics do go here',
                project: 'Latest project',
                dueDate: '10-12-2016'
            }
        ];
}]);