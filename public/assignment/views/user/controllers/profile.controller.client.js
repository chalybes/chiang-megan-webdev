(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService, currentUser) {

        var model = this;
        currentUser = model.user;
        // model.userId = $routeParams['userId']; no longer necessary
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        // Methods below no longer needed because now Passport can resolve user info and pass it
        // userService
        //     .findUserById(model.userId)
        //     .then(renderUser);

        // function init() {
        //     renderUser(currentUser);
        // }
        //
        // init();
        //
        // function renderUser(user) {
        //     model.user = user;
        // }

        function logout() {
            userService.logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                })
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        // function deleteUser(user) {
        //     userService
        //         .deleteUser(user._id)
        //         .then(function () {
        //             $location.url('/');
        //         }, function () {
        //             model.error = "Unable to un-register you";
        //         });
        // }

    }

})();