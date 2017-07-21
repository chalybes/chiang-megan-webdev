(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams, widgetService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.trustThisContent = trustThisContent;
        model.getWidgetUrlForType = getWidgetUrlForType;

        function init() {

            console.log("ALEX 1");

            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                })
        }

        init();

        function trustThisContent(html) {
            //need to scrub before using this function
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var linkUrlParts = youTubeLink.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-' + type.toLowerCase() + '.view.client.html';
        }

    }

})();