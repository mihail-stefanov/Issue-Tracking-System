angular.module('issueTrackingSystemApp')
    .controller('ProjectScreenController', ['$scope', '$routeParams', '$http', '$q', '$location', 'authorisationService', 'projectService', 'issueService', 'userService', 'paginationService', function ($scope, $routeParams, $http, $q, $location, authorisationService, projectService, issueService, userService, paginationService) {
        
        $scope.goToDashboard = function () {
            $location.url('/');
        };
        
        $scope.editCurrentProject = function() {
            $location.url('projects/' + $scope.projectId + '/edit/');
        }
        
        $scope.addIssue = function() {
            $location.url('projects/' + $scope.projectId + '/add-issue/');
        }
        
        $scope.goToIssue = function (issueId) {
            $location.url('issues/' + issueId);
        }
        
        $scope.logout = function() {
            authorisationService.logout();
            $location.url('/');
        }
        
        $scope.currentUser = userService.getCurrentUserCredentials();
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
            
            $scope.fullProjectsCollection = projectService.getProjects({
                filter: '',
                pageSize: '1000',
                pageNumber: '1'
            });
            
            $scope.fullUserCollection = userService.getAllUsers();
            
            
            $q.all([
                $scope.fullProjectsCollection.$promise,
                $scope.fullUserCollection.$promise,
                $scope.currentUser.$promise
            ]).then(function () {
                
                // Pre-selecting the current project
                $scope.fullProjectsCollection.Projects.forEach(function (project, index, array) {
                    if ($scope.currentProject.Id == project.Id) {
                        $scope.newIssueSelectedProject = $scope.fullProjectsCollection.Projects[index];
                        console.info($scope.newIssueSelectedProject);
                    }
                });
                
                // Pre-selecting the current user as a assignee
                $scope.fullUserCollection.forEach(function (user, index, array) {
                    if ($scope.currentUser.userName == user.Username) {
                        $scope.newIssueSelectedAssignee = $scope.fullUserCollection[index];
                    }
                });
                
                $scope.writtenLabels = '';
                
                // Preparing the issue to be sent to the server
                
                $scope.addNewIssue = function () {
                    
                    var issueToSave = {};
                    
                    issueToSave.Title = $scope.newIssueTitle;
                    issueToSave.Description = $scope.newIssueDescription;
                    issueToSave.DueDate = $scope.newIssueDueDate.toString(); 
                    // TODO: Consider creating a custom service for picking dates and times
                    issueToSave.ProjectId = $scope.newIssueSelectedProject.Id;
                    issueToSave.AssigneeId = $scope.newIssueSelectedAssignee.Id;
                    issueToSave.PriorityId = $scope.newIssueSelectedPriority.Id;
                    issueToSave.labels = [];
                    
                    var obtainedLabels = $scope.newIssueWrittenLabels.split(/\s*,\s*/);
                    
                    obtainedLabels.forEach( function (label) {
                        issueToSave.labels.push({Name:label});
                    });
                    
                    issueService.addNewIssue({}, issueToSave).$promise.then(function () {
                        $location.url('projects/' + $scope.projectId);
                    });
                };
                
            });
            
            
            
            
            if ($location.url() == '/projects/' + $scope.projectId + '/add-issue') {
                $scope.addIssueModalShown = true;
            } else {
                $scope.addIssueModalShown = false;
            }

            $scope.hideAddIssueModal = function() {
                $location.url('projects/' + $scope.projectId);
            };
            
        });
        
        console.log($scope.currentProject);
        
        

        
    }]);