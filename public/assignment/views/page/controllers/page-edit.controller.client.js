(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, pageService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then( function (pages) {
                    model.pages = pages;
                });

            pageService
                .findPageById(model.pageId)
                .then( function (page) {
                    model.page = page;
                });
        }

        init();

        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/page');
        }

        function updatePage(page, pageId) {
            pageService.updatePage(page, pageId);
            $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/page');
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/page');
        }

    }

})();