var app = require('../express');
var widgetModel = require('./models/widgets/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname + '/../public/assignment/uploads' });

app.post("/api/assignment/upload", upload.single('myFile'), uploadImage);

app.get('/api/widget/:widgetId', findWidgetById);
app.get('/api/page/:pageId/widget', findWidgetsByPageId);
app.post('/api/assignment/:pageId/widget', createWidget);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);


var widgets = [{ "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
               { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
               { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
               { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
               { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
               { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
               { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}];

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId; //assuming you're editing a widget, otherwise there wouldn't be an ID
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    // widget = findWidgetById(widgetId);

    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    if (widget == null) {
        widget = {};
    }

    // widget = {"_id": null, "widgetType": "IMAGE", "pageId": pageId, "width": width, "url": null};

    widget.url = '/../public/assignment/uploads/' + filename;

    // createWidget(pageId, widget);

    var callbackUrl   = "/assignment/index.html#!/user/" + userId + "/websites/"+ websiteId + "/page/" + pageId + "/widget/" + widgetId;

    if (widget._id == null) {
        callbackUrl   = "/assignment/#!/user/" + userId + "/websites/" + websiteId + "/page/" + pageId + "/widget/new-image"
            + "?url=" + widget.url;
    }

    res.redirect(callbackUrl);
}

function createWidget(req, res) {
    // var widget = req.body;
    // widget._id = (new Date()).getTime() + "";
    // widget.pageId = req.params.pageId;
    //
    // //This is for creating an image widget from uploadImage(), if there exists a query parameter in the URL when pressing
    // //an HTML form button that would call this createWidget() method, the query parameter would be taken from the URL
    // //and be passed in. In this case the query parameter is the URL for the uploaded image from uploadImage(), passed
    // //in to be set as the URL for a new widget
    // if (req.query['url']) {
    //     widget.url = req.query['url'];
    // }
    //
    // widgets.push(widget);
    // res.send(widget);

    var widget = req.body;
    var pageId = req.params["pageId"];

    widgetModel.findWidgetsByPageId(pageId)
        .then(function (results) {
            widget.index = results.length;
            widgetModel.createWidget(pageId, widget)
                .then(function(Widget) {
                    res.json(Widget);
                });
        });


}

function updateWidget(req, res) {
    // var widget = req.body;
    // var widgetId = req.params.widgetId;
    // for (var w in widgets) {
    //     if (widgetId === widgets[w]._id) {
    //         widgets[w] = widget;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);

    var widgetId = req.params["widgetId"];
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function deleteWidget(req, res) {
    // var widgetId = req.params.widgetId;
    // var widget = widgets.find(function (widget) {
    //     return widget._id === widgetId;
    // });
    // var index = widgets.indexOf(widget);
    // widgets.splice(index, 1);
    // res.sendStatus(200);

    var widgetId = req.params["widgetId"];

    widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findWidgetById(req, res) {

    // var widgetId = req.params['widgetId'];
    //
    // var widget = widgets.find(function (widget) {
    //     return widget._id === widgetId;
    // });
    //
    // res.send(widget);

    var widgetId = req.params["widgetId"];

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

function findWidgetsByPageId(req, res) {
    //
    // var pageId = req.params['pageId'];
    //
    // var results = [];
    //
    // for (var w in widgets) {
    //     if (widgets[w].pageId === pageId) {
    //         results.push(widgets[w]);
    //     }
    // }
    // res.send(results);

    var pageId = req.params["pageId"];

    widgetModel
        .findWidgetsByPageId(pageId)
        .then(function (results) {
            res.json(results);
        });
}