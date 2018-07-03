// Initialize Firebase
var config = {
    apiKey: "AIzaSyAd3oW918rHigpri6GeNxjwxSG9Di8Bdvo",
    authDomain: "projectone-b0b0c.firebaseapp.com",
    databaseURL: "https://projectone-b0b0c.firebaseio.com",
    projectId: "projectone-b0b0c",
    storageBucket: "",
    messagingSenderId: "789722548155"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
    eventsArray = [];

    $("#calendar").fullCalendar({
        header: {
            left: 'month,agendaWeek,agendaDay',
            center: 'title',
            right: 'prevYear,prev,next,nextYear'
        },
        selectable: true,
        selectHelper: true,
        editable: true,
        durationEditable: true,
        eventLimit: true,
        eventClick: function (calEvent) {
            alert('Event: ' + calEvent.title);
            alert('Event: ' + calEvent.start);
            alert('Event: ' + calEvent.end);
        }

    });

    $("#calendar").fullCalendar('addEventSource', eventsArray)

    $("#createEvent").on("click", function () {
        $("#eventModal").modal('show')

        $("#saveEvent").on("click", function () {
            var eventTitle = $("#eventTitle-input").val().trim()
            var startDate = $("#startDate-input").val().trim()
            var endDate = $("#endDate-input").val().trim()

            $('#eventModal').modal('hide');

            database.ref('/events').push({
                event: eventTitle,
                startDate: startDate,
                endDate: endDate

            })
        })
    })

    database.ref('/events').on("child_added", function (snapshot) {
        var event = snapshot.val().event;
        var start = snapshot.val().startDate;
        var end = snapshot.val().endDate;

        $("#calendar").fullCalendar('renderEvent', { title: event, start: start, end: end }, true);
        $("#calendar").fullCalendar('refetchEvents')
    })

});
