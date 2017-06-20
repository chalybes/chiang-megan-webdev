(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }];

        return {
            createPage: createPage,
            findPageById: findPageById,
            findPageByWebsiteId: findPageByWebsiteId,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.created = new Date();
            page.updated = new Date();
            page.websiteId = websiteId;
            pages.push(page);
        }

        function updatePage(pageId, page) {
            var pagedit = pages.find(function (page) {
                return page._id === pageId;
            })

            pagedit = page;
        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            })
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageByWebsiteId(websiteId) {
            return pages.find(function (website) {
                return website._id === websiteId;
            });
        }

        function findPageById(pageId) {
            return pages.find(function (pageId) {
                return page._id === pageId;
            });
        }

    }
})();