(function () {
    angular
        .module('CYO')
        .controller('CYOcontroller', CYOcontroller);

    function CYOcontroller($location, murineService, currentUser) {

        var model = this;
        model.user = currentUser;

        function init() {
            murineService
                .findAllLines()
                .then(function (lines) {
                    model.lines = lines;
                });
        }

        init();

    }

})();