(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];
        model.pageId = $routeParams['pageId'];
        model.createWidget = createWidget;


        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }

        init();

        function createWidget(pageId, widget) {
            widget.pageId = model.pageId;
            widget.type = model.widget.type;
            widget.size = model.widget.size;
            widget.width = model.widget.width;
            widget.url = model.widget.url;
            widget.text = model.widget.text;
            widget.description = model.widget.description;

            widgetService.createWidget(pageId, widget);
            $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

    }

})();