(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

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

                userService
                    .register(user)
                    .then(function (user) {
                        $location.url('/profile')
                    });
            }

        }
    }

})();