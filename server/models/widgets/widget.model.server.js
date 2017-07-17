var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');

var widgetModel = mongoose.model('userWidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetByPageId = findWidgetByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    return widgetModel.create(widget);
}

function findWidgetByPageId(pageId) {
    return widgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.find({_id: widgetId});
}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {$set: newWidget});
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}