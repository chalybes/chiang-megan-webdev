(function () {
    angular
        .module('CYO')
        .controller('registerController', registerController);

    function registerController($location, muserService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var user = null; //userService.findUserByUsername(username);

            if (user !== null) {
                model.error = "Username is not available";
            } else {

                var user = { username: username,
                             password: password };

                muserService
                    .register(user)
                    .then(function (user) {
                        $location.url('/')
                    });
            }

        }
    }

})();