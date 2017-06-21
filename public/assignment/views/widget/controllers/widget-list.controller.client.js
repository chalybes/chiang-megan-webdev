(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams) {

        var model = this;

        var widgets = [{ "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                       { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                       { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
                       { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                       { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                       { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
                       { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}];

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgets = widgets;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.trustThisContent = trustThisContent;
        model.getWidgetUrlForType = getWidgetUrlForType;

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