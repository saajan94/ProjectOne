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
        startEditable: true,
        durationEditable: true,
        eventLimit: true,
        eventClick: function (calEvent) {
            alert('Event: ' + calEvent.title);
            alert('Start Date: ' + calEvent.start);
            alert('End Date: ' + calEvent.end);
        }

    });

    $("#calendar").fullCalendar('addEventSource', eventsArray)

    $("#createEvent").on("click", function () {
        $("#eventModal").modal('show')

        $("#saveEvent").on("click", function () {
            var eventTitle = $("#eventTitle-input").val().trim()
            var startDate = $("#startDate-input").val().trim()
            var endDate = $("#endDate-input").val().trim()
            var backgroundColor = $("#colorSelect").val().trim()

            $("#eventTitle-input").val("");
            $("#startDate-input").val("");
            $("#endDate-input").val("");
            $("#colorSelect").val("");

            $('#eventModal').modal('hide');

            database.ref('/events').push({
                event: eventTitle,
                startDate: startDate,
                endDate: endDate,
                eventColor: backgroundColor
            })
        })
    })

    database.ref('/events').on("child_added", function (snapshot) {
        var event = snapshot.val().event;
        var start = snapshot.val().startDate;
        var end = snapshot.val().endDate;
        var color = snapshot.val().eventColor

        $("#calendar").fullCalendar('renderEvent', { title: event, start: start, end: end, backgroundColor: color }, true);
        $("#calendar").fullCalendar('refetchEvents')
    })

});
