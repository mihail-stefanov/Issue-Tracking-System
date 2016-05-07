angular.module('issueTrackingSystemApp')
    .controller('AllProjectsScreenController', ['$scope', '$location', '$q', '$http', 'projectService', 'authorisationService', 'paginationService', function ($scope, $location, $q, $http, projectService, authorisationService, paginationService) {

        // Title buttons and info

        $scope.goToDashboard = function () {
            $location.url('/');
        };

        $scope.logout = function () {
            authorisationService.logout();
            $location.url('/');
        };
        
        $scope.goToProject = function (projectId) {
            $location.url('projects/' + projectId);
        };

        $scope.addProject = function () {
            $location.url('issues/add/');
        };

        // Data manipulation

        $scope.projectsEmpty = false;

        $scope.obtainData = function () {

            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.fullProjectsCollection = projectService.getProjects({
                filter: '',
                pageSize: '1000',
                pageNumber: '1'
            });
        };

        $scope.obtainData();

        $q.when($scope.fullProjectsCollection.$promise).then(function () {

            $scope.projectPaginator = paginationService.getPaginatorInstance();

            $scope.projectPaginator.config($scope.fullProjectsCollection.Projects, 10);
            $scope.projectPages = $scope.projectPaginator.getPagesArray();
            $scope.selectProjectPage = $scope.projectPaginator.selectPage;
            
            $scope.$watch($scope.projectPaginator.getDataToDisplay, function () {
                $scope.projectDataSubset = $scope.projectPaginator.getDataToDisplay();
            });

        });


    }]);