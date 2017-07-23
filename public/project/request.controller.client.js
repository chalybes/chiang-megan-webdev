(function () {
    angular
        .module('CYO')
        .controller('requestController', requestController);

    function requestController() {

        var model = this;

        function prepareForCalendar(request) {
            model.request = request;
        }

        function calendarEventCall() {
            events.insert();
        }

        // Refer to the JavaScript quickstart on how to setup the environment:
        // https://developers.google.com/google-apps/calendar/quickstart/js
        // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
        // stored credentials.

        var event = {
            'summary': 'Delivery date for' + request.mline,
            'location': request.room,
            'description': request.amount + request.mline,
            'start': {
                'dateTime': '2015-05-28T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2015-05-28T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(function(event) {
            appendPre('Event created: ' + event.htmlLink);
        });
    }
})();