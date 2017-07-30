(function () {
    angular
        .module('CYO')
        .controller('requestController', requestController);

    function requestController($location, requestService) {

        var model = this;
        model.requestoDB = requestoDB;

        function requestoDB(orderRequest) {

            if (orderRequest !== null) {
                return requestService
                    .createRequest(orderRequest)
                    .then(function (order) {
                        $location.url('/listOfRequests');
                    });
            } else {
                model.error = "Please fill out the request";
            }
        }

    }
})();