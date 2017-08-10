(function () {
    angular
        .module('CYO')
        .controller('editRequestsController', editRequestsController);

    function editRequestsController($routeParams, requestService, $location) {

        var model = this;

        model.orderId = $routeParams["orderId"];
        model.updateRequest = updateRequest;
        model.deleteRequest = deleteRequest;


        function init() {

            requestService.findRequestById(model.orderId)
                .then(function (order) {
                    model.order = order;
                });
        }

        init();

        function createRequest(order) {
            requestService.createRequest(order);
            $location.url('/listOfRequests');
        }

        function updateRequest(orderId, order) {
            requestService.updateRequest(orderId, order);
            $location.url('/listOfRequests');
        }

        function deleteRequest(orderId) {
            requestService.deleteRequest(orderId);
            $location.url('/listOfRequests');
        }
    }

})();