(function () {
    angular
        .module('CYO')
        .factory('murineService', murineService);

    function murineService($http) {

        return {
            createLine: createLine,
            updateLine: updateLine,
            deleteLine: deleteLine,
            findLineById: findLineById,
            findAllLines: findAllLines
        };

        function createLine(line) {

            var url = "/api/newLine";

            return $http.post(url, line)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateLine(lineId, line) {

            var url = "/api/updateLine" + lineId;

            return $http.put(url, line)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteLine(lineId) {

            var url = "/api/killine/" + lineId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllLines() {

            var url = "/api/allines";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findLineById(lineId) {

            var url = "/api/findLine/" + lineId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();