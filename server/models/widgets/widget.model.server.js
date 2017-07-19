var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var widgetSchema = require('./widget.schema.server');

var widgetModel = mongoose.model('userWidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget);
}

function findWidgetsByPageId(pageId) {
    return widgetModel.find({_page: pageId})
        .populate("_page")
        .sort({index: "ascending"})
        .exec();
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {$set: newWidget});
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}