angular.module('issueTrackingSystemApp')
    .factory('paginationService', function () {

        var rawData = [];
        var currentPage = 1;
        var totalPages = 0;
        var pageSize = 5;
        var pagesArray = [];
        var dataSubset = [];

        var obtainPages = function () {
            var generatedArray = [];
            var w3Class = 'w3-green';

            for (var i = 1; i <= totalPages; i++) {

                var currentPageObject = {};

                if (i > 1) {
                    w3Class = '';
                }

                currentPageObject.w3Class = w3Class;
                currentPageObject.theNumber = i;

                generatedArray.push(currentPageObject);
            }

            return generatedArray;
        }

        var obtainSubset = function () {
            dataSubset = [];

            for (var index in rawData) {
                if (index >= (currentPage - 1) * pageSize) {
                    if (index >= (currentPage - 1) * pageSize + pageSize) {
                        break;
                    }

                    dataSubset.push(rawData[index]);
                }
            }
        };

        return {
            config: function (data, itemsPerPage) {
                pageSize = itemsPerPage;
                rawData = data;
                totalPages = Math.ceil(data.length / itemsPerPage);

                obtainSubset();
                pagesArray = obtainPages();
            },

            getPagesArray: function () {
                return pagesArray;
            },

            getDataToDisplay: function () {
                return dataSubset;
            },

            selectPage: function ($event) {
                currentPage = $event.target.getAttribute("value");

                // Removing the green color
                var parent = $event.target.parentNode.parentNode;

                for (var i = 0; i < parent.children.length; i++) {
                    parent.children[i].children[0].setAttribute("class", "");
                }

                $event.target.setAttribute("class", "w3-green");

                obtainSubset();
            }
        };
    });