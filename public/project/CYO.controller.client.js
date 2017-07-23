(function () {
    angular
        .module('CYO')
        .controller('CYOcontroller', CYOcontroller);

    function CYOcontroller($location) {

        var model = this;

        var mouselines = [{name: "AgRP",  status: "Online", generation: "N7", litters: new Date(Date.UTC(2017,06,14)), availability: "high"},
                          {name: "Brs3",  status: "Online", generation: "N6", litters: new Date(Date.UTC(2017,06,10)), availability: "low"},
                          {name: "Calca", status: "Online", generation: "N12", litters: new Date(Date.UTC(2017,06,21)), availability: "high"},
                          {name: "D1",    status: "Offline", generation: "?", litters: null, availability: "NA"},
                          {name: "FLPeR", status: "Online", generation: "N8", litters: new Date(Date.UTC(2017,06,05)), availability: "med"},
                          {name: "Gcg",   status: "Online", generation: "N7", litters: new Date(Date.UTC(2017,07,03)), availability: "low"}];

        model.mouselines = mouselines;
        model.request = requestLine;

        function requestLine(mouseline) {
            if (mouseline !== null) {
                $location.url('/line/' + mouseline._id);
            } else {
                model.message = "This mouse line is not available through us";
            }
        }


    }

})();