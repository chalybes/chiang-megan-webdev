(function () {
    angular
        .module('CYO')
        .controller('adminCommentsViewController', adminCommentsViewController);

    function adminCommentsViewController($routeParams, commentsService) {

        var model = this;
        var userId = $routeParams["userId"];
        // model.deleteComment = deleteComment;

        function init() {
            commentsService.findUserCommentsForAdmin(userId)
                .then(function (comments) {
                    // console.log(comments);
                    model.comments = comments;
                });
        }

        init();

        // function deleteComment(comment) {
        //     commentsService.deleteComment(comment._id)
        //         .then(init);
        // }
    }

})();