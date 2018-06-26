$(document).ready(function () {
    $("#calendar").fullCalendar({
        header: {
            left: "month, agendaWeek, agendaDay",
            center: "title",
            right: "prevYear, prev, next, nextYear"
        },
    });
});