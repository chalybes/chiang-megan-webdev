(function () {
    angular
        .module('CYO')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
                // controller: 'CYOcontroller',
                // controllerAs: 'model'
            })
            .when('/listOfLines', {
                templateUrl: 'views/linesList/listOfLines.html',
                controller: 'CYOcontroller',
                controllerAs: 'model'
            })
            .when('/editLine/:lineId', {
                templateUrl: 'views/editLines/editLines.html',
                controller: 'editLinesController',
                controllerAs: 'model'
            })
            .when('/request', {
                templateUrl: 'views/requestPage/request.html',
                controller: 'requestController',
                controllerAs: 'model'
            })
            .when('/listOfRequests', {
                templateUrl: 'views/placedRequests/listOfRequests.html',
                controller: 'listOfRequestsController',
                controllerAs: 'model'
            });
    }
})();