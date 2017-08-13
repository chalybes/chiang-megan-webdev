var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var commentsSchema = require('./comments.schema.server');
var commentsModel = mongoose.model('commentsModel', commentsSchema);

commentsModel.createComment = createComment;
commentsModel.deleteComment = deleteComment;
commentsModel.updateComment = updateComment;
commentsModel.findAllCommentsForUser = findAllCommentsForUser;
commentsModel.findCommentById = findCommentById;

module.exports = commentsModel;

function createComment(userId, comment) {
    comment._user = userId;
    return commentsModel.create(comment);
}

function updateComment(commentId, newComment) {
    return commentsModel.update({_id: commentId}, {$set: newComment});
}

function deleteComment(commentId) {
    return commentsModel.remove({_id: commentId});
}

function findAllCommentsForUser(userId) {
    return commentsModel.find({_user: userId})
        .populate("_user")
        .exec();
}

function findCommentById(commentId) {
    return commentsModel.findById(commentId);
}