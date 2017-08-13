(function () {
    angular
        .module('CYO')
        .controller('editLinesController', editLinesController);

    function editLinesController($routeParams, murineService, $location) {

        var model = this;

        model.lineId = $routeParams["lineId"];
        model.updateLine = updateLine;
        model.deleteLine = deleteLine;

        function init() {

            // murineService.findAllLines()
            //     .then(function (lines) {
            //         model.lines = lines;
            //     });
            murineService.findLineById(model.lineId)
                .then(function (line) {
                    model.line = line;
                });
        }

        init();

        function createLine(line) {
            murineService.createLine(line);
            $location.url('/listOfLines');
        }

        function updateLine(line, lineId) {
            murineService.updateLine(line, lineId);
            $location.url('/listOfLines');
        }

        function deleteLine(lineId) {
            murineService.deleteLine(lineId);
            $location.url('/listOfLines');
        }
    }

})();