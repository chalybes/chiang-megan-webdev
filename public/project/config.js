(function () {
    angular
        .module('CYO')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {currentUser: checkCurrentUser}
            })
            .when('/login', {
                templateUrl: 'views/home/login.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/home/register.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/profile/profile.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {currentUser: checkLoggedIn}
            })
            .when('/listOfLines', {
                templateUrl: 'views/linesList/listOfLines.html',
                controller: 'CYOcontroller',
                controllerAs: 'model',
                resolve: {currentUser: checkCurrentUser}
            })
            .when('/editLine/:lineId', {
                templateUrl: 'views/editLines/editLines.html',
                controller: 'editLinesController',
                controllerAs: 'model',
                resolve: {currentUser: checkAdmin}
            })
            .when('/request', {
                templateUrl: 'views/requestPage/request.html',
                controller: 'requestController',
                controllerAs: 'model',
                resolve: {currentUser: checkLoggedIn}
            })
            .when('/listOfRequests', {
                templateUrl: 'views/placedRequests/listOfRequests.html',
                controller: 'listOfRequestsController',
                controllerAs: 'model',
                resolve: {currentUser: checkCurrentUser}
            })
            .when('/editRequest/:orderId', {
                templateUrl: 'views/editRequests/editRequests.html',
                controller: 'editRequestsController',
                controllerAs: 'model',
                resolve: {currentUser: checkAdmin}
            })
            .when('/adminCommandCenter', {
                templateUrl: 'views/adminCommand/adminCommand.html',
                controller: 'adminCommandController',
                controllerAs: 'model',
                resolve: {currentUser: checkAdmin}
            })
            .when('/:userId/adminCommentsView', {
                templateUrl: 'views/adminCommand/adminCommentsView.html',
                controller: 'adminCommentsViewController',
                controllerAs: 'model',
                resolve: {currentUser: checkAdmin}
            });

        function checkCurrentUser($q, $location, muserService) {
            var deferred = $q.defer();

            muserService.checkLoggedIn()
                .then(function (user) {

                    if (user === '0') {
                        deferred.resolve({});
                    } else {
                        deferred.resolve(user); //the user exists, resolve the signed-in status
                    }
                });
            return deferred.promise;
        }

        function checkAdmin($q, $location, muserService) {
            var deferred = $q.defer();

            muserService.checkAdmin()
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

        function checkLoggedIn($q, $location, muserService) {

            // return userService.checkLoggedIn();

            var deferred = $q.defer();

            muserService.checkLoggedIn()
                .then(function (user) {

                    if (user === '0') {

                        deferred.reject();
                        $location.url('/login'); //the user does not currently exists, cannot navigate to pages it's not supposed to

                    } else {
                        deferred.resolve(user); //the user exists, resolve the signed-in status
                    }
                });
            return deferred.promise;
        }

    }
})();