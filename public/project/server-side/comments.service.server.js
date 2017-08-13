var app = require('../../../express.js');
var commentsModel = require('./models/comments.model.server');

app.get('/find/:userId/allComments/', findAllCommentsForUser);
app.get('/find/adminCommentsView/:userId', findUserCommentsForAdmin);
app.get('/findComment/:commentId', findCommentById);
app.post('/newComment/:userId', createComment);
app.put('/updateComment/:commentId', updateComment);
app.delete('/erase/:commentId', deleteComment);

function createComment(req, res) {
    var userId = req.user._id;
    var comment = req.body;

    commentsModel.createComment(userId, comment)
        .then(function (comment) {
            res.json(comment);
        });
}

function updateComment(req, res) {
    var comment = req.body;
    var commentId = req.params["commentId"];

    commentsModel.updateComment(commentId, comment)
        .then(function (status) {
            res.send(status);
        });
}

function deleteComment(req, res) {

    var commentId = req.params["commentId"];

    commentsModel.deleteComment(commentId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findAllCommentsForUser(req, res) {
    // var userId = req.params["userId"];

    var userId = req.user._id;

    commentsModel.findAllCommentsForUser(userId)
        .then(function (comments) {
            res.json(comments);
        });
}

function findUserCommentsForAdmin(req, res) {

    var userId = req.params["userId"];

    commentsModel.findAllCommentsForUser(userId)
        .then(function (comments) {
            res.json(comments);
        });
}

function findCommentById(req, res) {
    var commentId = req.params["commentId"];

    commentsModel.findCommentById(commentId)
        .then(function (comment) {
           res.json(comment);
        });
}