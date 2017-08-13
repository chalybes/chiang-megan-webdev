(function () {
    angular
        .module('CYO')
        .factory('commentsService', commentsService);

    function commentsService($http) {

        return {
            createComment: createComment,
            updateComment: updateComment,
            deleteComment: deleteComment,
            findCommentById: findCommentById,
            findAllCommentsForUser: findAllCommentsForUser,
            findUserCommentsForAdmin: findUserCommentsForAdmin
        };

        function createComment(userId, comment) {

            var url = "/newComment/" + userId;

            return $http.post(url, comment)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateComment(commentId, comment) {

            var url = "/updateComment/" + commentId;

            return $http.put(url, comment)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteComment(commentId) {

            var url = "/erase/" + commentId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCommentsForUser(userId) {

            var url = "/find/" + userId + "/allComments/";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserCommentsForAdmin(userId) {

            var url = "/find/adminCommentsView/" + userId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findCommentById(commentId) {

            var url = "/findComment/" + commentId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();