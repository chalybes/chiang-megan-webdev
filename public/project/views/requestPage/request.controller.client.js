(function () {
    angular
        .module('CYO')
        .controller('requestController', requestController);

    function requestController() {

        // const CONFIG = require('./config/Settings');
        // const CalendarAPI = require('node-google-calendar');
        // var cal = new CalendarAPI(CONFIG);

        var model = this;

        function prepareForCalendar(mrequest) {

            var mrequest = model.mrequest;

            var resource = {
                'summary': mrequest.mline,
                'location': mrequest.room,
                'start': {
                    dateTime: new Date()// events starts time
                },
                'end': {
                    dateTime: new Date() // events ends time
                }
            };

            // var event = {
            //     'summary': 'Delivery date for' + request.mline,
            //     'location': request.room,
            //     'description': request.amount + request.mline,
            //     'start': {
            //         'dateTime': '2015-05-28T09:00:00-07:00',
            //         'timeZone': 'America/Los_Angeles'
            //     },
            //     'end': {
            //         'dateTime': '2015-05-28T17:00:00-07:00',
            //         'timeZone': 'America/Los_Angeles'
            //     },
            //     'reminders': {
            //         'useDefault': false,
            //         'overrides': [
            //             {'method': 'email', 'minutes': 24 * 60},
            //             {'method': 'popup', 'minutes': 10}
            //         ]
            //     }
            // };

            makevent(resource);
        }


        function makevent(resource) {
            // var calendar = google.calendar('v3');
            //
            // calendar.events.insert({
            //         auth: oauth2Client,
            //         calendarId: 'primary',
            //         resource: resource},
            //     function (err, res) {
            //         if (err) {
            //             console.log('There was an error: ' + err);
            //             return ;
            //         }
            //         console.log(res, 'Event created:', res.htmlLink);
            //     });

            var calendar = google.calendar('v3');

            calendar.events.insert({
                auth: oauth2Client,
                calendarId: 'primary',
                sendNotifications: true,
                resource: resource
            }, function(err,resp) {
                if (err) {
                    console.log('There was an error : ' + err);
                    return;
                }
                console.log(resp,'Event created:', resp.htmlLink);
            });
        }

    }
})();