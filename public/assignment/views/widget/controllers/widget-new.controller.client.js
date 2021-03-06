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

            widgetService.createWidget(pageId, widget).then(function (widget) {

                $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/page/' + model.pageId + '/widget');
            })
        }

    }

})();