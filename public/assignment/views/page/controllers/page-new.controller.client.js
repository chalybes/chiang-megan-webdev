(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams, pageService, $location) {

        var model = this;

        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }

        init();

        function createPage(websiteId, page) {
            websiteId = model.websiteId;
            pageService.createPage(websiteId, page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/');
        }

    }

})();