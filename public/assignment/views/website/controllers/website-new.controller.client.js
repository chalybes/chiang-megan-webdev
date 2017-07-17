(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }

        init();

        function createWebsite(website) {
            // websites.developerId = model.userId;
            websiteService
                .createWebsite(model.userId, website)
                .then(function (website) {
                    $location.url('/user/' + model.userId + '/websites');
                });
        }

    }

})();