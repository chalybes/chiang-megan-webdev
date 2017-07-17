(function () {
    angular
        .module('CYO')
        .controller('CYOcontroller', CYOcontroller);

    function CYOcontroller() {

        var model = this;

        var mouselines = [{name: "AgRP", status: "Online", generation: "N7", litters: new Date(Date.UTC(2017,06,14)), availability: "high"},
                          {name: "Brs3", status: "Online", generation: "N6", litters: new Date(Date.UTC(2017,06,10)), availability: "low"},
                          {name: "Calca", status: "Online", generation: "N12", litters: new Date(Date.UTC(2017,06,21)), availability: "high"},
                          {name: "FLPeR", status: "Online", generation: "N8", litters: new Date(Date.UTC(2017,06,05)), availability: "med"}];

        model.mouselines = mouselines;

    }

})();