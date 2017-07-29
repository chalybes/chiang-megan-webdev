(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.createWidget = createWidget;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {

            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });

            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                });
        }

        init();

        function createWidget(pageId, widget) {
            widget.pageId = model.pageId;
            widgetService.createWidget(widget);
            $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function updateWidget(widgetId, widget) {
            widgetService.updateWidget(widgetId, widget);
            $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

    }

})();