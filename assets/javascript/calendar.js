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
        allDay: false,
        timeFormat: 'h(:mm)t',

    });

    $("#calendar").fullCalendar('addEventSource', eventsArray)

    $("#createEvent").on("click", function () {
        $("#eventModal").modal('show')

        // Captures values entered into the modal fields on click
        $("#saveEvent").on("click", function () {
            var eventTitle = $("#eventTitle-input").val().trim()
            var startDate = $("#startDate-input").val().trim() + "T" + $("#startTime-input").val().trim();
            var endDate = $("#endDate-input").val().trim() + "T" + $("#endTime-input").val().trim();
            var backgroundColor = $("#colorSelect").val().trim()

            // Empties modal fields upon submission
            $("#eventTitle-input").val("");
            $("#startDate-input").val("");
            $("#startTime-input").val("");
            $("#endDate-input").val("");
            $("#colorSelect").val("");

            $('#eventModal').modal('hide');

            // Uploads the data acquired from the user to the Firebase database
            database.ref('/events').push({
                event: eventTitle,
                startDate: startDate,
                endDate: endDate,
                eventColor: backgroundColor
            })
        })
    })

    // Creates a Firebase event to add events to the database
    database.ref('/events').on("child_added", function (snapshot) {
        var event = snapshot.val().event;
        var start = snapshot.val().startDate;
        var end = snapshot.val().endDate;
        var color = snapshot.val().eventColor

        // Renders events each time the calendar is loaded
        $("#calendar").fullCalendar('renderEvent', { title: event, start: start, end: end, backgroundColor: color }, true);
        $("#calendar").fullCalendar('refetchEvents')

    })

});
