(function () {
    angular
        .module('CYO')
        .controller('profileController', profileController);

    function profileController($routeParams, $location, commentsService, muserService, currentUser) {

        var model = this;

        model.user = currentUser;
        model.userId = currentUser._id;
        model.createComment = createComment;
        model.deleteComment = deleteComment;
        model.updateUser = updateUser;
        model.logout = logout;

        function init() {
            findAllComments();
        }

        init();

        function createComment(comment) {
            commentsService
                .createComment(model.userId, comment)
                .then(findAllComments);
        }

        function deleteComment(comment) {
            commentsService.deleteComment(comment._id)
                .then(init);
        }

        function updateUser(user) {
            muserService
                .updateUser(model.userId, user)
                .then(function () {
                    model.message = "User update was successful";
                });
        }

        function findAllComments() {
            commentsService.findAllCommentsForUser(model.userId)
                .then(function (comments) {
                    model.comments = comments;
                });
        }

        function logout() {
            muserService.logout()
                .then(function () {
                    $location.url('/');
                });
        }

    }

})();