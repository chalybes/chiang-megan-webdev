(function () {
    angular
        .module('CYO')
        .controller('homeController', homeController);

    function homeController(currentUser, $location, muserService) {
        // function homeController() {

        var model = this;

        model.user = currentUser;

        model.logout = logout;

        function logout() {
            muserService.logout()
                .then(function () {
                    // $location.url('/login');
                    $location.url('/');
                });
        }
    }

})();