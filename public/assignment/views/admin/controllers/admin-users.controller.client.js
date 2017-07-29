(function () {
    angular
        .module('WAM')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService) {
        var model = this;

        function init() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        init();
    }
    
})();