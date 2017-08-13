(function () {
    angular
        .module('CYO')
        .controller('listOfRequestsController', listOfRequestsController);

    function listOfRequestsController($location, requestService, currentUser) {

        var model = this;

        model.user = currentUser;

        function init() {
            requestService
                .findAllRequests()
                .then(function (orderRequests) {
                    model.orderRequests = orderRequests;
                });
        }

        init();

    }

})();