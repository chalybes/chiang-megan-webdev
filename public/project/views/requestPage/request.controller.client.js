(function () {
    angular
        .module('CYO')
        .controller('requestController', requestController);

    function requestController($location, requestService, currentUser) {

        var model = this;

        model.user = currentUser;

        var clientId = '186029965139-lr46un71h6cuc737mtl24ge5mdemanbo.apps.googleusercontent.com';
        var apiKey = 'AIzaSyDP6KgQl4e92qhOHGG2FvyXgy5I_sxU-3E';
        var scopes = 'https://www.googleapis.com/auth/calendar';

        model.requestoDB = requestoDB;
        model.handleAuthClick = handleAuthClick;

        function requestoDB(orderRequest) {

            if (orderRequest !== null) {
                return requestService
                    .createRequest(orderRequest)
                    .then(function (order) {
                        $location.url('/listOfRequests');
                    });
            } else {
                model.error = "Please fill out the request";
            }
        }


        function handleClientLoad() {
            gapi.client.setApiKey(apiKey);
            window.setTimeout(checkAuth,1);
            checkAuth();
        }

        function checkAuth() {
            gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
                handleAuthResult);
        }

        function handleAuthResult(authResult) {
            var authorizeButton = model.handleAuthClick;

            authorizeButton.onclick = handleAuthClick;

        }

        function handleAuthClick(event) {
            gapi.auth.authorize(
                {client_id: clientId, scope: scopes, immediate: false},
                handleAuthResult);
            makeApiCall();
            return false;
        }

        function makeApiCall() {

            var summary = model.order.amount + " " + model.order.gender + " " + model.order.strain;
            var orderDeadline = new Date(model.order.deadline);

            gapi.client.load('calendar', 'v3', function() {

                var resource = {
                    "summary": summary,
                    "location": model.order.room,
                    'start': {
                        'dateTime': orderDeadline
                    },
                    "end": {
                        "dateTime": orderDeadline
                    }
                };

                var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': resource
                });

                request.execute(function(resp) {
                    console.log(resp);
                });

            });
        }

    }
})();