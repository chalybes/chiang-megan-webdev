(function () {
    angular
        .module('CYO')
        .controller('adminCommentsViewController', adminCommentsViewController);

    function adminCommentsViewController($routeParams, commentsService) {

        var model = this;
        var userId = $routeParams["userId"];

        function init() {
            commentsService.findUserCommentsForAdmin(userId)
                .then(function (comments) {
                    model.comments = comments;
                });
        }

        init();

    }

})();