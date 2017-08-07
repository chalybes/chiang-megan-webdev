(function () {
    angular
        .module('CYO')
        .controller('loginController', loginController);

    function loginController($location, muserService) {

        var model = this;

        model.login = function (username, password) {

            // var found = userService.findUserByCredentials(username, password);

            muserService
            //.findUserByCredentials(username, password)
                .login(username, password)
                .then(login, handleError);

            function login(found) {
                if (found !== null) {

                    $location.url('/request');

                } else {

                    model.message = "Username " + username + " not found, please try again";
                }
            }

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";
            }
        };
    }

})();