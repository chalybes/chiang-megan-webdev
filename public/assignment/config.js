(function () {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {currentUser: checkCurrentUser}
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {currentUser: checkLoggedIn}
            })
            .when('/user/:userId/websites', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model',
                resolve: {currentUser: checkLoggedIn}
            })
            .when('/user/:userId/websites/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model',
                resolve: {currentUser: checkLoggedIn}
            })
            .when('/user/:userId/websites/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId/widget/new-header', {
                templateUrl: 'views/widget/templates/widget-header.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId/widget/new-image', {
                templateUrl: 'views/widget/templates/widget-image-editor.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId/widget/new-html', {
                templateUrl: 'views/widget/templates/widget-new-html.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId/widget/new-youtube', {
                templateUrl: 'views/widget/templates/widget-new-youtube.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId/widget/:widgetId/edit', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId/widget/:widgetId/image-editor', {
                templateUrl: 'views/widget/templates/widget-image-editor.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model'
            })
            .when('/user/:userId/websites/:websiteId/page/:pageId/widget/:widgetId/flickrSearch', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'flickrController',
                controllerAs: 'model'
            });
    }

    function checkLoggedIn($q, $location, userService) {
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

})();