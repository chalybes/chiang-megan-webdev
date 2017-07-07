(function () {
    angular
        .module('directiveLecture', [])
        .directive('hello', helloTag)
        .directive('wdDraggable', wdDraggable);

        function wdDraggable() {

            function linkFunction(scope, element) {
                $(element).sortable();
            }

            return {
                link: linkFunction
            }
        }

        function helloTag() {

            function linkFunction(scope, element, attrs) {
                console.log(element);
                element.html('goodbye');
            }

            return {
                template: 'hello world!!!',
                link: linkFunction
            }
        }

})();