(function () {
    angular
        .module('CYO')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'CYOcontroller',
                controllerAs: 'model'
            })
            .when('/request', {
                templateUrl: 'request.html',
                controller: 'requestController',
                controllerAs: 'model'
            });
    }
})();