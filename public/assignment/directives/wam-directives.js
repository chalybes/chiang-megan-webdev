(function () {
    angular
        .module('WAM')
        .directive('wamSortable', wamSortable);

    function wamSortable(widgetService, $routeParams) {

        function linkFunction(scope, element) {

            var pageId = $routeParams["pageId"];

            $(element).sortable({

                // start: function (event, ui) {
                //     ui.item.startIndex = ui.item.index();
                // },
                //
                // stop: function (event, ui) {
                //     widgetService
                //         .sortWidgets(pageId, ui.item.startIndex, ui.item.index());
                // }

                update: function(event, ui) {
                    var widgetOrder = $(this).sortable('toArray').toString();
                    
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();