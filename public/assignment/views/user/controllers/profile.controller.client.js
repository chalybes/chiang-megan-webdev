(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService, currentUser) {

        var model = this;
        model.user = currentUser;
        model.userId = currentUser._id;
        // model.userId = $routeParams['userId']; no longer necessary
        model.updateUser = updateUser;
        // model.deleteUser = deleteUser;
        model.unregister = unregister;
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
                    // $location.url('/login');
                    $location.url('/');
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
                .unregister(user._id)    // .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/login');
                });
        }
    }

})();