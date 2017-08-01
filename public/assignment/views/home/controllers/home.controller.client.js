(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController(currentUser, userService, $location) {
    // function homeController() {

        var model = this;

        model.user = currentUser;

        model.logout = logout;

        function logout() {
            userService.logout()
                .then(function () {
                    // $location.url('/login');
                    $location.url('/');
                });
        }

    }

})();