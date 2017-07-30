(function () {
    angular
        .module('CYO')
        .controller('listOfRequestsController', listOfRequestsController);

    function listOfRequestsController($location, requestService) {

        var model = this;

        var peepsRequests = [{name: "Brooke",     mouseline: "Hsd11b2", amount: "6",  gender: "Males",   deadline: new Date(Date.UTC(2017,6,8)), room: "N049",  delivered: "Y"},
                             {name: "Chris",      mouseline: "TacR3",   amount: "10", gender: "Males",   deadline: new Date(Date.UTC(2017,6,22)), room: "N049",  delivered: "N"},
                             {name: "Jane",       mouseline: "Stxbp3",  amount: "2",  gender: "Females", deadline: new Date(Date.UTC(2017,6,11)), room: "N049",  delivered: "Y"},
                             {name: "Riffat",     mouseline: "AgRPDTR", amount: "2",  gender: "Females", deadline: new Date(Date.UTC(2017,7,30)), room: "N049",  delivered: "Y"},
                             {name: "Stephanie",  mouseline: "R26Gnrq", amount: "4",  gender: "Males",   deadline: new Date(Date.UTC(2017,7,18)), room: "N049",  delivered: "Y"}];

        model.peepsRequests = peepsRequests;

        // function init() {
        //     requestService
        //         .findAllRequests()
        //         .then(function (orderRequests) {
        //             model.orderRequests = orderRequests;
        //         })
        // }

    }

})();