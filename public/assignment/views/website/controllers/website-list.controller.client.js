(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService, currentUser) {

        var model = this;
        model.user = currentUser;
        model.userId = currentUser._id;

        // model.userId = $routeParams['userId'];

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                })
        }

        init();

    }

})();