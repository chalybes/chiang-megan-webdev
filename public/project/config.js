(function () {
    angular
        .module('CYO')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html'
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

        function checkCurrentUser($q, $location, userService) {
            var deferred = $q.defer();

            userService.checkLoggedIn()
                .then(function (currentUser) {

                    if (currentUser === '0') {
                        deferred.resolve({});
                    } else {
                        deferred.resolve(currentUser); //the user exists, resolve the signed-in status
                    }
                });
            return deferred.promise;
        }

        function checkAdmin($q, $location, userService) {
            var deferred = $q.defer();

            userService.checkAdmin()
                .then(function (currentUser) {
                    if (currentUser === '0') {
                        deferred.resolve({});
                        $location.url('/');
                    } else {
                        deferred.resolve(currentUser);
                    }
                });
            return deferred.promise;
        }

        function checkLoggedIn($q, $location, userService) {

            // return userService.checkLoggedIn();

            var deferred = $q.defer();

            userService.checkLoggedIn()
                .then(function (currentUser) {

                    if (currentUser === '0') {

                        deferred.reject();
                        $location.url('/login'); //the user does not currently exists, cannot navigate to pages it's not supposed to

                    } else {
                        deferred.resolve(currentUser); //the user exists, resolve the signed-in status
                    }
                });
            return deferred.promise;
        }

    }
})();