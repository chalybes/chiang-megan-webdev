(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {

        // var pages = [{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        //              { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        //              { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }];

        return {
            createPage: createPage,
            findPageById: findPageById,
            findPageByWebsiteId: findPageByWebsiteId,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            // page._id = (new Date()).getTime() + "";
            // page.created = new Date();
            // page.updated = new Date();
            // page.websiteId = websiteId;
            // pages.push(page);

            var url = "/api/assignment/" + websiteId + "/page";
            // creating brand new instance because we're making a new page
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            // var pagedit = pages.find(function (page) {
            //     return page._id === pageId;
            // })
            // pagedit = page;

            var url = "/api/assignment/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePage(pageId) {
            // var page = pages.find(function (page) {
            //     return page._id === pageId;
            // })
            // var index = pages.indexOf(page);
            // pages.splice(index, 1);

            var url = "/api/assignment/page/" + pageId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByWebsiteId(websiteId) {

            // var results = [];
            //
            // for (var p in pages) {
            //     if (pages[p].websiteId === websiteId) {
            //         results.push(pages[p]);
            //     }
            // }
            //
            // return results;

            var url = "/api/page/" + websiteId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageById(pageId) {
            // return pages.find(function (page) {
            //     return page._id === pageId;
            // });

            var url = "/api/assignment/page/" + pageId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();