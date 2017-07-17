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
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }

        init();

        function createWebsite(website) {
            website.developerId = model.userId;
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