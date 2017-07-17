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
                // model.message = user;
                return userService
                    .createUser(user)
                    .then(function (user) {
                        $location.url('/user/' + user._id + '/websites')
                    });
            }

            // if (found !== null) {
            //     $location.url('/user/' + found._id);
            //     // $scope.message = "Welcome " + username;
            // } else {
            //     model.message = "Username " + username + " not found, please try again";
            // }
        }
    }

})();