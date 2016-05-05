angular.module('issueTrackingSystemApp')
    .controller('ProjectScreenController', ['$scope', '$routeParams', '$http', '$q', '$location', 'authorisationService', 'projectService', 'issueService', 'paginationService', function ($scope, $routeParams, $http, $q, $location, authorisationService, projectService, issueService, paginationService) {
        
        $scope.goToDashboard = function () {
            $location.url('/');
        };
        
        $scope.editCurrentProject = function() {
            $location.url('projects/' + $scope.projectId + '/edit/');
        }
        
        $scope.addIssue = function() {
            $location.url('projects/' + $scope.projectId + '/add-issue/');
        }
        
        $scope.logout = function() {
            authorisationService.logout();
            $location.url('/');
        }
        
        $scope.currentProject = {};
        $scope.currentProjectIssues = {};
        
        $scope.issuesEmpty = false;
        
        $scope.projectId = $routeParams.projectId;
        
        $scope.obtainData = function () {
            console.info('Data reobtained!');
            $http.defaults.headers.common['Authorization'] = authorisationService.getAuthorisationToken();

            $scope.currentProject = projectService.getProjectById({
                projectId: $scope.projectId
            });
            
            $scope.currentProjectIssues = issueService.getIssuesByProjectId({
                projectId: $scope.projectId
            });
        }
        
        $scope.obtainData();
        
        $q.all([
            $scope.currentProject.$promise, 
            $scope.currentProjectIssues.$promise
        ]).then(function() {
                        
            var convertToStringOfNames = function(arrayOfObjects) {
                var names = '';
                
                arrayOfObjects.forEach(function(obj, index, array) {
                    if (index < array.length - 1) {
                        names += obj.Name + ', ';
                    } else {
                        names += obj.Name;
                    }
                });
                
                return names;
            };
            
            $scope.currentProjectLabels = convertToStringOfNames($scope.currentProject.Labels);
            $scope.currentProjectPriorities = convertToStringOfNames($scope.currentProject.Priorities);
            
            // Checking if there are any relevant issues

            if ($scope.currentProjectIssues.length == 0) {
                $scope.issuesEmpty = true;
            }
            
            // Setting up the pagination
            $scope.issuePaginator = paginationService.getPaginatorInstance();
            
            // Issues pagination
            $scope.issuePaginator.config($scope.currentProjectIssues, 5);
            $scope.issuePages = $scope.issuePaginator.getPagesArray();
            $scope.selectIssuePage = $scope.issuePaginator.selectPage;
            $scope.$watch($scope.issuePaginator.getDataToDisplay, function () {
                $scope.issueDataSubset = $scope.issuePaginator.getDataToDisplay();
            });
            
            
            
            
            // Modal screen for adding new issues to the project

            if ($location.url() == '/projects/' + $scope.projectId + '/add-issue') {
                $scope.addIssueModalShown = true;
            } else if ($location.url() == '/projects/' + $scope.projectId) {
                $scope.addIssueModalShown = false;
            }
            
            console.log($location.url() == '/projects/' + $scope.projectId + '/add-issue');
            console.log($location.url() == '/projects/' + $scope.projectId);


            $scope.hideAddIssueModal = function() {
                $location.url('projects/' + $scope.projectId);
            };
            
            
            
            
        });
        
        console.log($scope.currentProject);
        
        

        
    }]);