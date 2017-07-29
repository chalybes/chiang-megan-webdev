(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService, currentUser) {

        var model = this;
        model.user = currentUser;
        model.userId = currentUser._id;

        // model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            // model.pages = pageService.findPageByWebsiteId(model.websiteId);

            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }

        init();
    }

})();