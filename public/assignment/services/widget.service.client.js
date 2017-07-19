(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        function createWidget(pageId, widget) {
            // widget._id = (new Date()).getTime() + "";
            // widget.pageId = pageId;
            // widgets.push(widget);

            var url = "/api/assignment/" + pageId + "/widget"
            // creating brand new instance because we're making a new widget
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {
            // var widgetedit = widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // })
            //
            // widgetedit = widget;

            var url = "/api/assignment/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWidget(widgetId) {
            // var widget = widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // })
            // var index = widgets.indexOf(widget);
            // widgets.splice(index, 1);

            var url = "/api/assignment/widget/" + widgetId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            // var results = [];
            //
            // for (var w in widgets) {
            //     if (widgets[w].pageId === pageId) {
            //         results.push(widgets[w]);
            //     }
            // }
            // return results;

            var url = "/api/page/" + pageId + "/widget";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetById(widgetId) {
            // return widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // });

            var url = "/api/widget/" + widgetId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();