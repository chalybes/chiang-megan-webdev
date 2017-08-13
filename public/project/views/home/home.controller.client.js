(function () {
    angular
        .module('CYO')
        .controller('homeController', homeController);

    function homeController(currentUser, $location, muserService) {

        var model = this;

        model.user = currentUser;

        model.logout = logout;

        function logout() {
            muserService.logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }

})();