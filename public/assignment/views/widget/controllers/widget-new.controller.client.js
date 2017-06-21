(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.widgetId = $routeParams['widgetId'];
        model.pageId = $routeParams['pageId'];
        model.createWidget = createWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }

        init();

        function createWidget(pageId, widget) {
            widget.pageId = model.pageId;
            widgetService.createWidget(pageId, widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

    }

})();