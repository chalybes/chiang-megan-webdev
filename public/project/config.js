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
            });
    }
})();