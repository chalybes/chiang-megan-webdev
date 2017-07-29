(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService.findAllWebsitesForUser(model.userId).then(function (websites) {
                model.websites = websites;
            });

            websiteService.findWebsiteById(model.websiteId).then(function (website) {
                model.website = website;
            });
        }

        init();

        function createWebsite(website) {
            website.userId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/' + model.userId + '/websites');
        }

        function updateWebsite(website, websiteId) {
            websiteService.updateWebsite(website, websiteId);
            $location.url('/user/' + model.userId + '/websites');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + model.userId + '/websites');
        }

    }

})();