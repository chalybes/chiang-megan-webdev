(function () {
    angular
        .module('CYO')
        .factory('requestService', requestService);

    function requestService($http) {

        return {
            createRequest: createRequest,
            updateRequest: updateRequest,
            deleteRequest: deleteRequest,
            findRequestById: findRequestById,
            findAllRequests: findAllRequests
        };

        function createRequest(orderRequest) {

            var url = "/mouseOrder/order";

            return $http.post(url, orderRequest)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateRequest(orderId, orderRequest) {

            var url = "/mouseOrder/update/" + orderId;

            return $http.put(url, orderRequest)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteRequest(orderId) {

            var url = "/mouseOrder/delete/" + orderId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRequestById(orderId) {

            var url = "/mouseOrder/" + orderId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllRequests() {

            var url = "/mouseOrder/all";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();