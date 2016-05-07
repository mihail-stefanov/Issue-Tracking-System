angular.module('issueTrackingSystemApp')
    .controller('AllProjectsScreenController', ['$scope', '$location', '$q', '$http', 'projectService', 'authorisationService', 'userService', 'paginationService', function ($scope, $location, $q, $http, projectService, authorisationService, userService, paginationService) {

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
            $location.url('projects/add/');
        };

        // All projects

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


            // Add new project modal

            $scope.fullUserCollection = userService.getAllUsers();
            $scope.currentUser = userService.getCurrentUserCredentials();
            
            $q.all([
                $scope.fullUserCollection.$promise,
                $scope.currentUser.$promise
            ]).then(function () {
                
                // Pre-selecting the current user as a leader
                $scope.fullUserCollection.forEach(function (user, index, array) {
                    if ($scope.currentUser.userName == user.Username) {
                        $scope.newProjectSelectedLeader = $scope.fullUserCollection[index];
                    }
                });
                
                // Preparing the project to be sent to the server
                
                $scope.saveNewProject = function () {
                    
                    var projectToSave = {};
                    
                    projectToSave.Name = $scope.newProjectName;
                    projectToSave.Description = $scope.newProjectDescription;
                    projectToSave.ProjectKey = $scope.newProjectKey;
                    projectToSave.LeadId = $scope.newProjectSelectedLeader.Id;
                    
                    projectToSave.labels = [];
                    projectToSave.priorities = [];
                    
                    var obtainedLabels = $scope.newProjectWrittenLabels.split(/\s*,\s*/);
                    var obtainedPriorities = $scope.newProjectWrittenPriorities.split(/\s*,\s*/);
                    
                    obtainedLabels.forEach( function (label) {
                        projectToSave.labels.push({Name:label});
                    });
                    
                    obtainedPriorities.forEach( function (priority) {
                        projectToSave.priorities.push({Name:priority});
                    });
                    
                    projectService.addProject({}, projectToSave).$promise.then(function (response) {
                        $location.url('projects/' + response.Id);
                    });
                };
                
            });
            
            if ($location.url() == '/projects/add') {
                $scope.addProjectModalShown = true;
            } else {
                $scope.addProjectModalShown = false;
            }

            $scope.hideAddProjectModal = function() {
                $location.url('projects/');
            };

        });

    }]);