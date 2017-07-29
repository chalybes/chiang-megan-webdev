var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test'); //tells where the connection is running

todoSchema = mongoose.Schema({
    title: String,
    dueDate: Date
});

todoModel = mongoose.model('TodoModel', todoSchema) //unique name

function findAllTodos() {
    return todoModel
        .find()
        .then(function (docs) {
            console.log(docs);
        });
}

// var todo1 = { title: 'Pick up milk', dueDate: new Date() };
//
// // a function can be passed to check for exceptions
// todoModel.create(todo1, function (err, doc) {
//
// });