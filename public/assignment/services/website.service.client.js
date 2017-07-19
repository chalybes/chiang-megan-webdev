(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var websites = [{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }];

        return {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser
        };

        function findWebsiteById(websiteId) {
            // return websites.find(function (website) {
            //     return website._id === websiteId;
            // });

            var url = "/api/assignment/website/" + websiteId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function createWebsite(userId, website) {
            // websites._id = (new Date()).getTime() + "";
            // websites.created = new Date();
            // websites.updated = new Date();
            // websites.push(websites);

            return $http.post('/api/assignment/user/' + userId + '/website', website)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            // var websitedit = websites.find(function (website) {
            //     return website._id === websiteId;
            // })
            //
            // websitedit = website;

            var url = "/api/assignment/website/" + websiteId;

            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            // var website = websites.find(function (website) {
            //     return website._id === websiteId;
            // })
            // var index = websites.indexOf(website);
            // websites.splice(index, 1);

            var url = "/api/assignment/website/" + websiteId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsitesForUser(userId) {
            // var resultSet = [];
            //
            // for (var w in websites) {
            //     if (websites[w].developerId === userId) {
            //         // websites[w].created = new Date();
            //         // websites[w].updated = new Date();
            //         resultSet.push(websites[w]);
            //     }
            // }
            // return resultSet;

            var url = "/api/assignment/" + userId + "/website"
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();