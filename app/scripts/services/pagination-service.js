angular.module('issueTrackingSystemApp')
    .factory('paginationService', function () {

        return {
            getPaginatorInstance: function getPaginatorInstance () {
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

                var convertObjToArray = function (obj) {
                    var outputArray = [];
                    var keys = Object.keys(obj);

                    for (var i = 0; i < keys.length; i++) {
                        var currentElement = {};
                        
                        currentElement.key = keys[i];
                        currentElement.value = obj[keys[i]];

                        outputArray.push(currentElement);
                    }

                    return outputArray;
                }

                return {
                    config: function (data, itemsPerPage) {
                        pageSize = itemsPerPage;
                        if (data instanceof Array) {
                            rawData = data;
                        } else {
                            rawData = convertObjToArray(data);
                        }

                        totalPages = Math.ceil(rawData.length / itemsPerPage);

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
            }
        }


    });