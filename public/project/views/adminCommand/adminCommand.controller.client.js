(function () {
    angular
        .module('CYO')
        .controller('adminCommandController', adminCommandController);

    function adminCommandController($routeParams, muserService, $location) {

        var model = this;
        model.deleteUser = deleteUser;

        function init() {
            findAllUsers();
        }

        init();

        function findAllUsers() {
            muserService.findAllUsers()
                .then(function (musers) {
                    model.musers = musers;
                });
        }

        function deleteUser(muser) {
            muserService.deleteUser(muser._id)
                .then(findAllUsers);
        }
    }

})();