(function () {
    angular
        .module('CYO')
        .factory('requestService', requestService);

    function requestService($http) {

        return {
            createRequest: createRequest,
            updateRequest: updateRequest,
            deleteRequest: deleteRequest,
            findAllRequests: findAllRequests
        };

        function createRequest(orderRequest) {

            return $http.post('/mouseOrder/', orderRequest)
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

        function findAllRequests() {

            var url = "/mouseOrder/all"
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();